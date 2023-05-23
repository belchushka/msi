import {AuthApi, setIsAuth} from '@/entities/auth';
import {validators} from '@/shared/forms';
import {navigateFx, ROUTES} from '@/shared/router';
import {attach, sample} from 'effector';
import {createForm} from 'effector-forms';

const loginFx = attach({effect: AuthApi.loginFx});

const form = createForm({
  fields: {
    login: {
      init: '',
      rules: [validators.isEmail, validators.isNotEmpty],
    },
    password: {
      init: '',
      rules: [validators.isNotEmpty],
    },
  },
});

sample({
  source: form.formValidated,
  target: loginFx,
});

sample({
  clock: loginFx.doneData,
  target: [
    setIsAuth.prepend(() => true),
    navigateFx.prepend(() => ROUTES.HOME),
  ],
});

export {form};
