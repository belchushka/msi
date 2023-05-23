import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {InternalAxiosRequestConfig} from 'axios';

const $host = axios.create({
  baseURL: 'http://campfire.ext-it.ru:4081/api/v1/',
});

const $authHost = axios.create({
  baseURL: 'http://campfire.ext-it.ru:4081/api/v1/',
});

const serializeInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.method === 'get') {
    config.paramsSerializer = {
      indexes: null,
    };
  }

  return config;
};

$host.interceptors.request.use(serializeInterceptor);
$authHost.interceptors.request.use(serializeInterceptor);

$authHost.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

$authHost.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export {$host, $authHost};
