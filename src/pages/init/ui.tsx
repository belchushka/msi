import {useTheme} from '@/shared/theme';
import {Button, GradientBackground} from '@/shared/ui';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Logo from '@assets/images/logo.png';
import styles from './styles';
import {Container} from '@/shared/ui';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';

export const InitPage: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <GradientBackground
        colors={[theme.colors.green['400'], theme.colors.green['700']]}
        style={styles.container}>
        <Container style={styles.container_inner}>
          <View style={styles.middle_block}>
            <Image style={styles.logo} source={Logo} />

            <Button
              onPress={() => navigation.navigate(ROUTES.SIGNIN, {})}
              fullWidth>
              Вход
            </Button>
            <Button
              onPress={() => navigation.navigate(ROUTES.SIGNUP, {})}
              fullWidth
              variant="outline">
              Регистрация
            </Button>
          </View>
          <View style={styles.bottom_block}>
            <TouchableOpacity>
              <Text style={styles.bottom_block_text}>Продолжить как Гость</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </GradientBackground>
    </View>
  );
};
