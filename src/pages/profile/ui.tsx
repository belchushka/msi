import { Container, GradientBackground } from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import { useStore } from 'effector-react';
import { $authStore } from '@/entities/auth';
import DefaultPicture from '@assets/images/default_userpicture.png';
import styles from './styles';


export const ProfilePage = () => {
  const {user} = useStore($authStore)
  console.log(user)
  console.log("user")


  return (
    <SafeView style={{flex: 1}}>
        <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
            <Container style={{flex: 1}}>
                <View style={styles.baseinfo_container}> 
                    <Image style={{width: 100, height: 100, borderRadius: 50, marginBottom: 24}} source={DefaultPicture}/>
                    <Text style={styles.name}>Имя Фамилия</Text>
                    <Text style={{fontSize: 18, color: 'black'}}>1 уровень</Text>
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
    </SafeView>
  );
};
