import { Button, Container, GradientBackground } from '@/shared/ui';
import { SafeView } from '@/shared/ui/safeView';
import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Dimensions, TextInput} from 'react-native';
import styles from './styles';
import { $authHost } from '@/shared/api';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/shared/router';



export const AddNewsPage = () => {

  const [text, setText] = useState('');
  const [header, setHeader] = useState('');
  const navigation = useNavigation()

  const handleSubmit = async ()=>{
        if (text.length <= 0 && header.length<=0){
            return
        }
        try {
            const {data} = await $authHost.post('/feed/post', {
                title: header,
                text,
                image:''
            })
            navigation.navigate(ROUTES.NEWS_SCREEN)
        }catch (e){

        }
  }
  
  return (
    <SafeView style={{backgroundColor: "#F9FAFB", flex: 1}}>
      <Container>
            <TextInput 
                multiline={true}
                numberOfLines={10}
                value={text}
                onChangeText={setText}
                style={styles.input_text_container}>

            </TextInput>
            <TextInput
                multiline={false}
                value={header}
                onChangeText={setHeader}
                style={styles.input_text_container}>
            
            <Button onPress={handleSubmit} variant='primary'>
                Опубликовать
            </Button>

  </TextInput>
      </Container>
    </SafeView>
  );
};
