import {Button, Container} from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import styles from './styles';
import {$authHost} from '@/shared/api';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';

export const AddNewsPage = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (text.trim().length === 0 && title.trim().length === 0) {
      return;
    }
    try {
      const {data} = await $authHost.post('/feed/post', {
        title,
        text,
        image: '',
      });
      Alert.alert('Новость успешно опубликована');
      navigation.navigate(ROUTES.HOME, {
        screen: ROUTES.NEWS_SCREEN,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.header}>
        <Container
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.header_text}>Новая новость</Text>
        </Container>
      </View>
      <Container style={{flex: 1}}>
        <TextInput
          placeholderTextColor={'black'}
          value={title}
          onChangeText={setTitle}
          style={[styles.input_text_container, {marginTop: 20}]}
          placeholder="Название"
        />
        <TextInput
          placeholderTextColor={'black'}
          multiline={true}
          numberOfLines={10}
          value={text}
          placeholder="Описание"
          onChangeText={setText}
          style={[
            styles.input_text_container,
            {textAlignVertical: 'top', marginTop: 20},
          ]}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}>
          <Button onPress={handleSubmit} variant="primary">
            Опубликовать
          </Button>
        </View>
      </Container>
    </SafeView>
  );
};
