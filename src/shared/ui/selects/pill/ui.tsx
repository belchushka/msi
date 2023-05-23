import {useTheme} from '@/shared/theme';
import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import {IPill, IPillSelect} from './types';

const Pill: React.FC<IPill> = ({onPress, value, selected}) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={() => onPress(value)}>
      <View style={[styles.pill, selected && styles.pill_selected]}>
        <Text
          style={[
            styles.pill_text,
            {
              color: selected ? theme.colors.green['800'] : 'white',
            },
          ]}>
          {value.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const PillSelect: React.FC<IPillSelect> = ({
  style,
  onSelect,
  value,
  data,
}) => {
  return (
    <View style={[style, styles.container]}>
      {data.map(val => {
        return (
          <Pill
            key={val.id}
            selected={val.id === value?.id}
            value={val}
            onPress={() => onSelect(val)}
          />
        );
      })}
    </View>
  );
};
