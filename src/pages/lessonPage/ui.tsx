import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import {Button} from '@/shared/ui';
import Video from 'react-native-video';

export const LessonPage = ({route}) => {
  const params = route.params;

  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.top}>
        <Video
          onError={console.log}
          source={{uri: params.lession?.lessions[0]?.url}}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.status}>Пройдено</Text>
        <Text style={styles.header}>{params.lession.title}</Text>
        <Text style={styles.description}>{params.lession.description}</Text>
        <Button style={{}} variant="primary">
          К следующему уроку
        </Button>
      </View>
    </SafeView>
  );
};
