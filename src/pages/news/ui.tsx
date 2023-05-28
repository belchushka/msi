import {SafeView} from '@/shared/ui/safeView';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import { $host } from '@/shared/api';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Container } from '@/shared/ui';


export const NewsPage = () => {
  
    const [news, setNews] = useState([]);

  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(()=>{
    (async ()=>{
      const {data} = await $host.get('/feed/allposts');
      console.log(data)
      setNews(data.data)
    })()
  },[])

  if (!news){
    return <ActivityIndicator/>
  }

  return (
    <SafeView style={{flex: 1}}>
      <Container>
        <Text style={styles.header}>Новости</Text>
        <ScrollView contentContainerStyle={{
          paddingVertical: 20,
          gap: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          flexWrap: 'wrap', 
        }}>

        {news.map((newsElement, i)=>{
            return <View style={styles.news_container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"}}/>
                    <Text style={{color: 'black', fontSize: 20, paddingLeft: 8, fontWeight: '500'}}>{newsElement.authorname}</Text>
                </View>
                <Text style={styles.news_text}>{newsElement.text.length > 200 ? newsElement.text.split(" ").slice(0, 20).join(" ")+"..." : newsElement.text}</Text>
                <TouchableOpacity>
                    <Text style={{color: '#A4CE57', fontSize: 20, paddingBottom: 20}}>Читать далее</Text>
                </TouchableOpacity>
                <Text style={{color: '#A7A9AB'}}>{newsElement.createdAt}</Text>
                {newsElement.image == null || newsElement.image.length < 10 ? null : <Image style={{height: 200, width: 340}} source={{uri: newsElement.image}}/>}
            </View>
        })}
            
        </ScrollView>
      </Container>
        
      
    </SafeView>
  );
};
