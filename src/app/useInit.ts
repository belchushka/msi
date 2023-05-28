import {AuthApi, setIsAuth as setIsAuthEvent} from '@/entities/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEvent} from 'effector-react';
import {useEffect, useState} from 'react';

export const useInit = () => {
  const setIsAuth = useEvent(setIsAuthEvent);
  const [loading, setLoading] = useState(false);
  const getMe = useEvent(AuthApi.getMeFx)
  useEffect(() => {
    (async () => {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuth(true);
        await getMe()
      }
      setLoading(false);
    })();
  }, []);

  return loading;
};
