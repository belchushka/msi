import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {IContainer} from './types';

export const Container: React.FC<IContainer> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View {...props} style={[style, styles.container]}>
      {children}
    </View>
  );
};
