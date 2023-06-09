import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {ILesson} from './types';
import {Image} from 'react-native';
import {useTheme} from '@/shared/theme';

export const Lesson: React.FC<ILesson> = ({title, image, style, ...props}) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[
        style,
        styles.container,
        {
          borderColor: theme.colors.dark[100],
        },
      ]}>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};
