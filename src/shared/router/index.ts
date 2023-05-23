import {createNavigationContainerRef} from '@react-navigation/native';
import {createEffect} from 'effector';

export enum ROUTES {
  INITIAL = 'init',
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  HOME = 'home',
  ONBOARDIBG = 'onboarding',
  ONBOARDING_TEST = 'onboarding_test',
}

const navigationRef = createNavigationContainerRef();

const navigateFx = createEffect<ROUTES, void>({
  handler: route => {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(route);
    }
  },
});

export {navigateFx, navigationRef};
