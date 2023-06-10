import {
  $authStore,
  AuthApi,
  setIsAuth as setIsAuthEvent,
} from '@/entities/auth';
import {ROUTES} from '@/shared/router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEvent, useStore} from 'effector-react';
import {useEffect, useState} from 'react';

export const useInit = () => {
  const setIsAuth = useEvent(setIsAuthEvent);
  const [loading, setLoading] = useState(false);
  const getMe = useEvent(AuthApi.getMeFx);
  const navigation = useNavigation();
  const {isAuth} = useStore($authStore);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        if (accessToken) {
          setIsAuth(true);
          await getMe();
        }
      } catch (e) {}

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (navigation) {
        const onboardingSliderPassed =
          (await AsyncStorage.getItem('onboardingSliderPassed')) === 'true';

        if (!onboardingSliderPassed) {
          navigation.navigate(ROUTES.ONBOARDING_SLIDER);
        }
        const onboardingPassed =
          (await AsyncStorage.getItem('onboardingPassed')) === 'true';
        if (!onboardingPassed) {
          navigation.navigate(ROUTES.ONBOARDIBG);
        }
      }
    })();
  }, [navigation]);

  return loading;
};
