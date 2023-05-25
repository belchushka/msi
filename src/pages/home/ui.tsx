import { Container, GradientBackground } from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { useTheme } from '@/shared/theme';
import { GradientHorisontal } from '@/shared/ui/gradientHorisontal';
import DotsIcon from '@assets/icons/Dots'

export const HomePage = () => {

  const theme = useTheme();

  return (
    <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
      <View style={styles.top}>
          <GradientHorisontal colors={[theme.colors.green['400'], theme.colors.green['700']]} style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.header}>
              Гитара
            </Text>
            <DotsIcon></DotsIcon>
            
          </GradientHorisontal>
      </View>
      <View style={styles.main}>
        <View>
          <Text>
            Прогесс по курсу
          </Text>
        </View>
      </View>
    </View>
  );
};
