import {Container} from '@/shared/ui';
import React, {useCallback, useMemo, useState} from 'react';
import {Text, Image, Alert} from 'react-native';
import {useStore, useEvent} from 'effector-react';
import {$authStore, logoutFx, setAuthUser} from '@/entities/auth';
import DefaultPicture from '@assets/images/default_userpicture.png';
import Exit from '@assets/icons/Exit';
import Edit from '@assets/icons/Edit';
import styles from './styles';
import * as Progress from 'react-native-progress';
import {useTheme} from '@/shared/theme';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {$authHost} from '@/shared/api';
import {View} from 'react-native';
import Ach1 from "@assets/images/Ach1.png"
import Ach2 from "@assets/images/Ach2.png"

export const ProfilePage = () => {
  const {user} = useStore($authStore);
  const logout = useEvent(logoutFx);
  const navigation = useNavigation();
  const [selectedAvatar, setSelectedAvatar] =
    useState<null | DocumentPickerResponse>(null);
  const setUser = useEvent(setAuthUser);

  const theme = useTheme();

  const onLogout = async () => {
    await logout();
    navigation.navigate(ROUTES.INITIAL);
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      if (response[0]) {
        setSelectedAvatar(response[0]);
        updateUserAvatar(response[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const updateUserAvatar = async (file: DocumentPickerResponse) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const {data} = await $authHost.post('/parse/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newAvatar = data.data;

      const {data: userData} = await $authHost.put('/users/me', {
        photo: newAvatar,
      });

      setUser(userData.data);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  const avatar = useMemo(() => {
    if (selectedAvatar) {
      return {uri: selectedAvatar.uri};
    }

    if (user.photo) {
      return {uri: user.photo};
    }

    return DefaultPicture;
  }, [selectedAvatar, user]);

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#F9FAFB', flex: 1}}>
        <Container style={{flex: 1}}>
          <View style={[styles.baseinfo_container, {marginTop: 32}]}>
            <View style={{flexDirection: 'row'}}>
              <Edit
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginRight: 50,
                }}
              />
              <TouchableOpacity onPress={handleDocumentSelection}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 24,
                  }}
                  source={avatar}
                />
              </TouchableOpacity>
              <Exit
                onPress={onLogout}
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginLeft: 50,
                }}
              />
            </View>
            <Text style={styles.name}>{user.firstname}</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 12, marginBottom: 12, fontFamily: 'DeeDee'}}>Уровень 1</Text>

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
          <View style={{height: 180, justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'black', fontFamily: 'DeeDee-Bold'}}>
              Достижения
            </Text>
            <Container
              style={{
                flex: 1,
                backgroundColor: 'white',
                marginBottom: 32,
                marginTop: 12,
                elevation: 5,
                shadowColor: '#0000001A',
                borderRadius: 8,
              }}>
                
              <View style={{flexDirection: 'row', gap: 20}}>
                <Image style={{height: 80, width: 80, marginTop: 20}} source={Ach1}></Image>  
                <View>
                    <Text style={{color: 'black', marginTop: 20, fontFamily: 'DeeDee-Bold', fontSize: 20}}>
                    1 курс!
                    </Text>
                    <Text style={{color: '#B2B2B2', fontSize: 18, marginTop: 4, fontFamily: 'DeeDeeLight', width: '70%'}}>
                        Вы записались на свой первый курс. Так держать!
                    </Text>
                </View>
              </View>  
              
              
            </Container>

          
          </View>
          <View style={styles.skills_container}>
            <Text style={{fontSize: 18, color: 'black', fontFamily: 'DeeDee-Bold'}}>
              Навыки
            </Text>
            <Container
              style={{
                flex: 1,
                backgroundColor: 'white',
                marginBottom: 32,
                marginTop: 12,
                elevation: 5,
                shadowColor: '#0000001A',
                borderRadius: 8,
              }}>
              <View style={{flexDirection: 'row', gap: 20}}>
                
                
              </View>
            </Container>
          </View>
        </Container>
      </View>
    </View>
  );
};
