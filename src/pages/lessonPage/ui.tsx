import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useTheme } from '@/shared/theme';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeView } from '@/shared/ui/safeView';
import { Button } from '@/shared/ui';


export const LessonPage = ({route}) => {

  const { lesson } = route.params;

  console.log(lesson)

  const theme = useTheme();

  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.top}>
        
      </View>

      <View style={styles.main}>
        <Text style={styles.status}>Пройдено</Text>
        <Text style={styles.header}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        <Button style={{}} variant='primary'>К следующему уроку</Button>
      </View>
    </SafeView>
  );
};
