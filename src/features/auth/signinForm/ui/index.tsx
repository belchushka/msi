import {Input, Button} from '@/shared/ui';
import {useForm} from 'effector-forms';
import React from 'react';
import {View} from 'react-native';
import {form} from '../model';
import styles from './styles';
import {ISigninForm} from './types';

export const SigninForm: React.FC<ISigninForm> = ({style}) => {
  const {submit, fields, hasError} = useForm(form);
  return (
    <View style={[style, styles.signinForm]}>
      <Input
        autoCapitalize="none"
        value={fields.login.value}
        onChangeText={fields.login.onChange}
        inputMode="email"
        autoFocus
        error={hasError('login')}
        placeholder="Email"
      />
      <Input
        value={fields.password.value}
        onChangeText={fields.password.onChange}
        secureTextEntry
        error={hasError('password')}
        placeholder="Пароль"
      />
      <Button onPress={() => submit()} style={styles.button}>
        Войти
      </Button>
    </View>
  );
};
