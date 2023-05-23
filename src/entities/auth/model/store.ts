import {combine, createEvent, createStore} from 'effector';

const setIsAuth = createEvent<boolean>();
const $isAuth = createStore(false).on(setIsAuth, (_, data) => data);

const $authStore = combine([$isAuth], ([isAuth]) => {
  return {
    isAuth,
  };
});

export {$authStore, setIsAuth, $isAuth};
