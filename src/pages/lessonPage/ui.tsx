import React from 'react';
import styles from './styles';
import {ScrollView, Text, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import {Button} from '@/shared/ui';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/shared/router';

export const LessonPage = ({route}) => {
  const params = route.params;
  console.log(params.lession);

  const navigation = useNavigation();

  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.top}>
        <Video
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="contain"
          controls
          onError={console.log}
          source={{uri: params.lession?.lessions[0]?.url}}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.status}>Пройдено</Text>
        <Text style={styles.header}>{params.lession.title}</Text>
        <Text style={styles.description}>{params.lession.description}</Text>
        <Button onPress={() => {
          
        }} style={{justifyContent: 'flex-end', marginTop: 24}} variant='outline_green'>
          Скачать материалы
        </Button>
        <Button onPress={() => {
          navigation.goBack();
        }} style={{justifyContent: 'flex-end', marginTop: 12}} variant="primary">
          К списку уроков
        </Button>
      </View>
    </SafeView>
  );
};
