import {setIsAuth as setIsAuthEvent} from '@/entities/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEvent} from 'effector-react';
import {useEffect, useState} from 'react';

export const useInit = () => {
  const setIsAuth = useEvent(setIsAuthEvent);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuth(true);
      }
      setLoading(false);
    })();
  }, []);

  return loading;
};
