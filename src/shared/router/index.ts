import {createNavigationContainerRef} from '@react-navigation/native';
import {createEffect} from 'effector';

export enum ROUTES {
  INITIAL = 'init',
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  HOME = 'home',
  ONBOARDIBG = 'onboarding',
  ONBOARDING_TEST = 'onboarding_test',
  COURSE_SCREEN = 'course_screen',
  MAP_SCREEN = 'map_screen',
  LESSON_SCREEN = 'lesson_screen',
  NEWS_SCREEN = 'news_screen',
  PROFILE_PAGE = 'profile_page',
  CREATE_NEWS = 'create_news'
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
