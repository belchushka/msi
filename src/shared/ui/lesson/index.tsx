import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {ILesson} from './types';
import {Image} from 'react-native';

export const Lesson: React.FC<ILesson> = ({title, image, style, ...props}) => {
  return (
    <View {...props} style={[style, styles.container]}>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};
