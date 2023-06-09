import { Container } from '@/shared/ui';
import React, { useCallback, useState } from 'react';
import {View, Text, Image} from 'react-native';
import { useStore, useEvent } from 'effector-react';
import { $authStore, logoutFx } from '@/entities/auth';
import DefaultPicture from '@assets/images/default_userpicture.png';
import Exit from '@assets/icons/Exit';
import Edit from '@assets/icons/Edit';
import styles from './styles';
import * as Progress from 'react-native-progress';
import { useTheme } from '@/shared/theme';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/shared/router';
import DocumentPicker from 'react-native-document-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';


export const ProfilePage = () => {
  const {user} = useStore($authStore)
  const logout = useEvent(logoutFx)
  const navigation = useNavigation()
  const [selectedAvatar, setSelectedAvatar] = useState<null | string>(null)

  const theme = useTheme();

  const onLogout = async ()=>{
    await logout()
    navigation.navigate(ROUTES.INITIAL)
  }

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if(response[0]){
        setSelectedAvatar(response[0].uri)
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
        <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
            <Container style={{flex: 1}}>
            <View style={[styles.baseinfo_container, {marginTop: 32}]}> 
            <View style={{flexDirection: 'row'}}>
                        <Edit style={{height: 50, width: 50, alignSelf: 'center', alignContent: 'center', marginRight: 50}}></Edit>
                        <TouchableOpacity onPress={handleDocumentSelection}>
                            <Image style={{width: 100, height: 100, borderRadius: 50, marginBottom: 24}} source={{uri: selectedAvatar}}/>
                        </TouchableOpacity>
                        <Exit onPress={onLogout} style={{height: 50, width: 50, alignSelf: 'center', alignContent: 'center', marginLeft: 50}}></Exit>
                    </View>
                    <Text style={styles.name}>{user.firstname}</Text>
                    <Text style={{fontSize: 18, color: 'black', marginBottom: 20}}>1 уровень</Text>
                    
                    <Progress.Bar
                        width={400}
                        borderRadius={40}
                        borderColor="transparent"
                        color={theme.colors.green.primary}
                        height={20}
                        progress={0.2}
                        unfilledColor={theme.colors.dark['100']}
                        />
                </View>
                <View style={styles.achievements_container}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>Достижения</Text>
                    <Container style={{flex: 1, backgroundColor: 'white', marginVertical: 32, elevation: 5, shadowColor: '#0000001A', borderRadius: 8}}>
                        <Text style={{color: 'black', marginVertical: 20, fontSize: 20,}}>Первый курс!</Text>
                        <Text style={{color: '#B2B2B2', fontSize: 20,}}>Вы записались на свой первый курс. Так держать!</Text>
                        <Text style={{color: '#A5D324', fontSize: 20, marginTop: 10}}>+100 очков</Text>
                    </Container>
                </View>
                <View style={styles.skills_container}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>Навыки</Text>
                    <Container style={{flex: 1, backgroundColor: 'white', marginVertical: 32, elevation: 5, shadowColor: '#0000001A', borderRadius: 8}}>
                        <View style={{flexDirection: 'row', gap: 20}}>
                            <View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                    <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Пианино</Text>
                                    <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                    <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Гитара</Text>
                                    <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                    <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>ИЗО</Text>
                                    <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 20}}>
                                    <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Театр</Text>
                                    <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                                </View>
                            </View>
                            <View>
                            <View style={{flexDirection: 'row', gap: 20}}>
                                <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Ударные</Text>
                                <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 20}}>
                                <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Живопись</Text>
                                <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 20}}>
                                <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Хор</Text>
                                <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 20}}>
                                <Text style={{fontSize: 18, color: 'black', marginTop: 16}}>Дизайн</Text>
                                <Text style={{fontSize: 18, color: '#A5D324', marginTop: 16}}>0 / 100</Text>
                            </View>
                        </View>
                        </View>
                    </Container>
                </View>
            </Container>
        </View>
    </View>
  );
};
