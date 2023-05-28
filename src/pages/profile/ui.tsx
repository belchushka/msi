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
  const userDefaultCategory = user?.categories.data?.[0]?.label || null
  const [selectedCategory, setSelectedCategory] = useState<any>(null)


  return (
    <SafeView style={{flex: 1}}>
        <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
            <Container style={{flex: 1}}>
                <View style={styles.baseinfo_container}> 
                    <Image style={{width: 100, height: 100, borderRadius: 50}} source={DefaultPicture}/>
                    <Text style={styles.name}>Саввочка Шульгин</Text>
                    <Text style={{fontSize: 18, color: 'black'}}>1 уровень</Text>
                </View>
                <View style={styles.achievements_container}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>Достижения</Text>
                </View>
                <View style={styles.skills_container}>
                    <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>Навыки</Text>
                </View>
            </Container>
        </View>
    </SafeView>
  );
};
