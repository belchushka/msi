import {combine, createEffect, createEvent, createStore} from 'effector';
import { AuthApi } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setIsAuth = createEvent<boolean>();
const setAuthUser = createEvent<any>();

const logoutFx = createEffect({
  handler: async ()=>{
    await AsyncStorage.removeItem("accessToken")
  }
})

const $isAuth = createStore(false).on(setIsAuth, (_, data) => data).reset(logoutFx.doneData);
const $authUser = createStore<any>(null).on(AuthApi.getMeFx.doneData, (_, data)=>data).reset(logoutFx.doneData)

const $authStore = combine([$isAuth, $authUser], ([isAuth, user]) => {
  return {
    isAuth,
    user
  };
});

export {$authStore, setIsAuth, $isAuth, setAuthUser, logoutFx};
