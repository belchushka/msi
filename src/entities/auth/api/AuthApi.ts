import {$authHost, $host} from '@/shared/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError, isAxiosError} from 'axios';
import {createEffect} from 'effector';
import {Alert} from 'react-native';

export interface RegisterParams {
  login: string;
  password: string;
  lastname: string;
  firstname: string;
  middlename: string;
  birthday: Date;
  age: string;
  role: number;
  city: string;
  country: string;
  categories: {data: string[]};
}

export interface LoginParams {
  login: string;
  password: string;
}

const registerFx = createEffect<RegisterParams, void, AxiosError>({
  handler: async params => {
    try {
      const {data} = await $host.post('/auth/signup', params);
      await AsyncStorage.setItem('accessToken', data.data.access_token);

      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        Alert.alert(
          e.response.data?.message || JSON.stringify(e.response.data),
        );
      }
      throw e;
    }
  },
});

const loginFx = createEffect<LoginParams, void, AxiosError>({
  handler: async params => {
    try {
      const {data} = await $host.post(
        '/auth/signin',
        {},
        {
          params,
        },
      );
      await AsyncStorage.setItem('accessToken', data.data.access_token);
      return data.data.access_token;
    } catch (e) {
      if (isAxiosError(e)) {
        Alert.alert(
          e.response.data?.message || JSON.stringify(e.response.data),
        );
      }
      throw e;
    }
  },
});

const getMeFx = createEffect({
  handler: async () => {
    const {data} = await $authHost.get('/users/me');
    return data.data;
  },
});

export const AuthApi = {
  registerFx,
  loginFx,
  getMeFx,
};
