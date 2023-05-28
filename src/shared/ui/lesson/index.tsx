import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {ILesson} from './types';
import { Container } from '../container';

export const Lesson: React.FC<ILesson> = ({
  children,
  title,
  style,
  ...props
}) => {
  return (
    <View {...props} style={[style, styles.container]}>
        <Container style={styles.image}></Container>
        <Text style={styles.header}>{title}</Text>
    </View>
  );
};
