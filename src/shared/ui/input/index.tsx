import {useTheme} from '@/shared/theme';
import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import {IInput} from './types';

export const Input: React.FC<IInput> = ({style, error, ...props}) => {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      cursorColor="white"
      style={[
        style,
        styles.input,
        error && {borderBottomColor: theme.colors.red['800']},
      ]}
    />
  );
};
