import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitPage} from '@/pages/init';
import {ROUTES} from '@/shared/router';
import {SigninPage} from '@/pages/signin';
import {SignupPage} from '@/pages/signup';
import {useStore} from 'effector-react';
import {$authStore} from '@/entities/auth';
import {HomePage} from '@/pages/home';
import {OnboardingPage} from '@/pages/onboarding';
import { TestScreen } from '@/pages/test';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {isAuth} = useStore($authStore);
  return (
    <Stack.Navigator
      initialRouteName={isAuth ? ROUTES.ONBOARDIBG : ROUTES.INITIAL}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuth ? (
        <>
          <Stack.Screen name={ROUTES.INITIAL} component={InitPage} />
          <Stack.Screen name={ROUTES.SIGNIN} component={SigninPage} />
          <Stack.Screen name={ROUTES.SIGNUP} component={SignupPage} />
        </>
      ) : (
        <>
          <Stack.Screen name={ROUTES.HOME} component={HomePage} />
          <Stack.Screen name={ROUTES.ONBOARDIBG} component={OnboardingPage} />
          <Stack.Screen
            name={ROUTES.ONBOARDING_TEST}
            component={TestScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
