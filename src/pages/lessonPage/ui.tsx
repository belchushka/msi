import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import {Button} from '@/shared/ui';
import Video from 'react-native-video';

export const LessonPage = ({route}) => {
  const {lesson} = route.params;
  console.log("url here")
  console.log(lesson.lessions)
  console.log(lesson?.lessions[0]?.url)


  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.top}>
        
        <Video source={{uri: lesson?.lessions[0]?.url}} />
      </View>

      <View style={styles.main}>
        <Text style={styles.status}>Пройдено</Text>
        <Text style={styles.header}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        <Button style={{}} variant="primary">
          К следующему уроку
        </Button>
      </View>
    </SafeView>
  );
};
