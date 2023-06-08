import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {IStydyComponent} from './types';
import styles from './styles';
import {useTheme} from '@/shared/theme';

export const CourseCard: React.FC<IStydyComponent> = ({
  active_icon,
  isActive,
  isDone,
  style,
  title,
  onPress,
  ...rest
}) => {
  const theme = useTheme();
  const innerSquareColor = isDone
    ? 'rgba(164, 206, 87, 0.4)'
    : 'rgba(255, 255, 255, 0.5)';
  const strokeColor = isActive
    ? theme.colors.green.primary
    : theme.colors.dark['100'];
  console.log(active_icon);
  return (
    <View
      style={[
        style,
        {
          alignItems: 'center',
        },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {
            borderColor: strokeColor,
          },
        ]}
        {...rest}
        activeOpacity={0.8}>
        <View style={[styles.innerSquare, {backgroundColor: innerSquareColor}]}>
          <Image style={{flex: 1, margin: 16}} source={{uri: active_icon}} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
