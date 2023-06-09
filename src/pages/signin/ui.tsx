import {useTheme} from '@/shared/theme';
import {Container, GradientBackground} from '@/shared/ui';
import React from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import Sculpture from '@assets/images/loginSculpture.png';
import styles from './styles';
import {SigninForm} from '@/features/auth';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';

import VK from '@assets/images/vk.png';
import Yandex from '@assets/images/yandex.png';

export const SigninPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

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
          <Image source={Sculpture} />
          <View style={styles.header}>
            <Text style={[styles.header_text, styles.header_text_title]}>
              Добро пожаловать!
            </Text>
            <Text style={[styles.header_text_subtitle, styles.header_text]}>
              Рады видеть Вас снова
            </Text>
          </View>
          <SigninForm style={styles.signinForm} />
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
              <Text style={styles.actions_text}>Регистрация</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actions_text}>Забыли пароль?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom_actions}>
            <Text style={styles.bottom_actions_title}>
              Или войдите с помощью
            </Text>
            <View style={styles.authMethodButtons}>
              <View style={styles.authMethodButtons_button}>
                <Image source={VK} />
              </View>
              <View style={styles.authMethodButtons_button}>
                <Image source={Yandex} />
              </View>
            </View>
          </View>
        </Container>
      </GradientBackground>
    </View>
  );
};
