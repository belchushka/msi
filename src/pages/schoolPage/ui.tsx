import React, {useEffect, useState} from 'react';
import styles from './styles';
import {SafeView} from '@/shared/ui/safeView';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import SchoolImage from "@assets/images/schoolImage.png"
import { ScrollView } from 'react-native-gesture-handler';
import Teacher1 from "@assets/images/teacher1.png"
import Teacher2 from "@assets/images/teacher2.png"
import Teacher3 from "@assets/images/teacher3.png"
import Otz1 from "@assets/images/otz1.png"
import Otz2 from "@assets/images/otz2.png"
import Star from "@assets/images/star.png"

export const SchoolPage = ({route}) => {

   const school = route.params.school;
   console.log(school); 

  return (
    <ScrollView style={{flex: 1}}>
      <Image source={SchoolImage} style={{width: "100%"}}></Image>
      <ScrollView style={{flex: 1, marginTop: 20}}>
        <Text style={{color: 'black', fontSize: 32, fontFamily: "DeeDee-Bold", marginHorizontal: 20}}>
            {school.name}
        </Text>
        <Text style={{color: 'black', fontSize: 18, fontFamily: 'DeeDee', marginHorizontal: 20, marginTop: 10}}>
            {school.address}
        </Text>
      </ScrollView>
      <View style={{flex: 3, marginHorizontal: 20}}>
        <Text style={{color: 'black', fontSize: 18, fontFamily: 'DeeDee-Bold', marginTop: 10}}>
            Направления
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8, gap: 8}}>
            <View style={{paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderColor: "#A4CE57", borderWidth: 3,}}>
                <Text style={{fontFamily: "DeeDee", fontSize: 20, color: "#A4CE57"}}>
                    Скрипка
                </Text>
            </View>
            <View style={{paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderColor: "#A4CE57", borderWidth: 3,}}>
                <Text style={{fontFamily: "DeeDee", fontSize: 20, color: "#A4CE57"}}>
                    Фортепиано
                </Text>
            </View>
            <View style={{paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderColor: "#A4CE57", borderWidth: 3,}}>
                <Text style={{fontFamily: "DeeDee", fontSize: 20, color: "#A4CE57"}}>
                    Вокал
                </Text>
            </View>
        </View>
        <Text style={{color: 'black', fontSize: 18, fontFamily: 'DeeDee-Bold', marginTop: 24}}>
            Учителя
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8, gap: 12}}>
            <View style={{backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 28, paddingHorizontal: 14}}>
                <Image source={Teacher1}></Image>
                <Text style={{fontSize: 20, fontFamily: "DeeDee", color: 'black', marginTop: 12}}>Логинова А. В</Text>
                <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#A7A9AB'}}>Учитель скрипки</Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image source={Star}></Image>
                    <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#000000'}}> {"4." + Math.floor(Math.random() * 9) + 1}</Text>
                </View>
            </View>
            <View style={{backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 28, paddingHorizontal: 14}}>
                <Image source={Teacher3}></Image>
                <Text style={{fontSize: 20, fontFamily: "DeeDee", color: 'black', marginTop: 12}}>Микуленко И. С</Text>
                <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#A7A9AB'}}>Учитель хора</Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image source={Star}></Image>
                    <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#000000'}}> {"4." + Math.floor(Math.random() * 9) + 1}</Text>
                </View>
            </View>
            <View style={{backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 28, paddingHorizontal: 14}}>
                <Image source={Teacher2}></Image>
                <Text style={{fontSize: 20, fontFamily: "DeeDee", color: 'black', marginTop: 12}}>Леванова Г. Д</Text>
                <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#A7A9AB'}}>Учитель театра</Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Image source={Star}></Image>
                    <Text style={{fontSize: 18, fontFamily: "DeeDee", color: '#000000'}}> {"4." + Math.floor(Math.random() * 9) + 1}</Text>
                </View>
            </View>
        </View>
        <Text style={{color: 'black', fontSize: 18, fontFamily: 'DeeDee-Bold', marginTop: 24}}>
            Отзывы
        </Text>
        <Image source={Otz1} style={{width: "100%", marginTop: 10, resizeMode: 'contain', height: 150}}></Image>
        <Image source={Otz2} style={{width: "100%", marginBottom: 32, resizeMode: 'contain', height: 150}}></Image>
      </View>
    </ScrollView>
  );
};
