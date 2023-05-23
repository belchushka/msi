import {$host} from '@/shared/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {createEffect} from 'effector';

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
    const {data} = await $host.post('/auth/signup', params);
    await AsyncStorage.setItem('accessToken', data.data.access_token);

    return data;
  },
});

const loginFx = createEffect<LoginParams, void, AxiosError>({
  handler: async params => {
    const {data} = await $host.post(
      '/auth/signin',
      {},
      {
        params,
      },
    );
    await AsyncStorage.setItem('accessToken', data.data.access_token);
    return data.data.access_token;
  },
});

export const AuthApi = {
  registerFx,
  loginFx,
};
