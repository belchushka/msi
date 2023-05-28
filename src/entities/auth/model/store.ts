import {combine, createEvent, createStore} from 'effector';
import { AuthApi } from '../api';

const setIsAuth = createEvent<boolean>();
const setAuthUser = createEvent<any>();

const $isAuth = createStore(false).on(setIsAuth, (_, data) => data);
const $authUser = createStore<any>(null).on(AuthApi.getMeFx.doneData, (_, data)=>data)

const $authStore = combine([$isAuth, $authUser], ([isAuth, user]) => {
  return {
    isAuth,
    user
  };
});

export {$authStore, setIsAuth, $isAuth, setAuthUser};
