import {Button, Container} from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, Alert, Image} from 'react-native';
import styles from './styles';
import {$authHost} from '@/shared/api';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const AddNewsPage = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const [selectedPhoto, setSelectedPhoto] =
    useState<DocumentPickerResponse | null>(null);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      if (response[0]) {
        setSelectedPhoto(response[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleSubmit = async () => {
    if (text.trim().length === 0) {
      return;
    }
    try {
      let image = '';
      if (selectedPhoto) {
        const formData = new FormData();
        formData.append('file', selectedPhoto);
        const {data} = await $authHost.post('/parse/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        image = data.data;
      }
      await $authHost.post('/feed/post', {
        title: '',
        text,
        image,
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
      <Container style={{flex: 1, backgroundColor: '#F2F4F6'}}>
        <TextInput
          placeholderTextColor={'black'}
          multiline={true}
          numberOfLines={12}
          value={text}
          placeholder="Введите текст"
          onChangeText={setText}
          style={[
            styles.input_text_container,
            {textAlignVertical: 'top', marginTop: 20, fontFamily: 'DeeDee'},
          ]}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginTop: 24,
          }}>
          {selectedPhoto && (
            <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                }}
                source={{uri: selectedPhoto.uri}}
              />
            </TouchableOpacity>
          )}
          <Button
            onPress={() => handleDocumentSelection()}
            style={{justifyContent: 'flex-end', flexGrow: 1}}
            variant="outline_green">
            {selectedPhoto ? 'Выбрать другое' : 'Прикрепить материалы'}
          </Button>
        </View>

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
