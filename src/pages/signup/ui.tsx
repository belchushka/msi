import {SignupForm} from '@/features/auth';
import {useTheme} from '@/shared/theme';
import {Container, GradientBackground} from '@/shared/ui';
import React from 'react';
import {KeyboardAvoidingView, StatusBar, View} from 'react-native';
import styles from './styles';

export const SignupPage = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <GradientBackground
        colors={[theme.colors.green['400'], theme.colors.green['700']]}
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
        }}>
        <Container style={styles.container}>
          <SignupForm />
        </Container>
      </GradientBackground>
    </View>
  );
};
