import {AuthApi, setIsAuth} from '@/entities/auth';
import {QuizApi} from '@/entities/quiz';
import {validators} from '@/shared/forms';
import {navigateFx, ROUTES} from '@/shared/router';
import {PillSelectValue} from '@/shared/ui';
import {attach, combine, createEvent, createStore, sample} from 'effector';
import {createForm, Rule} from 'effector-forms';
import {createGate} from 'effector-react';

const goNext = createEvent();
const goPrev = createEvent();
const reset = createEvent();
const submit = createEvent();

const getQuizzesCategoriesFx = attach({effect: QuizApi.getQuizCategoriesFx});

const registerFx = attach({effect: AuthApi.registerFx});
const getMeFx = attach({effect: AuthApi.getMeFx});

const $quizzesCategories = createStore<Array<PillSelectValue<string>>>([]).on(
  getQuizzesCategoriesFx.doneData,
  (_, data) => {
    return data.map((el, num) => ({id: num, label: el, value: el}));
  },
);

const $currentStep = createStore(0)
  .on(goNext, state => ++state)
  .on(goPrev, state => (state > 0 ? --state : 0))
  .reset(reset);
const formGate = createGate();

const form_first = createForm({
  fields: {
    name: {
      init: '',
      rules: [validators.isNotEmpty],
    },
    email: {
      init: '',
      rules: [validators.isEmail],
    },
    password: {
      init: '',
      rules: [validators.minLength(8)],
    },
    repeatPassword: {
      init: '',
      rules: [
        validators.isNotEmpty,
        {
          name: 'same',
          validator: (val, state) => state.password === val,
        },
      ],
    },
    categories: {
      init: null as null | PillSelectValue<string>,
    },
    accepted_privacy: {
      init: false,
      rules: [
        {
          name: '',
          validator: val => val,
        },
      ],
    },
  },
});

const form_second = createForm({
  fields: {
    age: {
      init: '',
      rules: [validators.minValue(5) as Rule<any>],
    },
    userType: {
      init: null as null | PillSelectValue<number>,
      rules: [validators.isNotNull],
    },
  },
});

const form_third = createForm({
  fields: {
    categories: {
      init: null as null | PillSelectValue<string>,
    },
  },
});

sample({
  clock: formGate.close,
  target: [form_first.reset, form_second.reset, form_third.reset, reset],
});

sample({
  clock: formGate.open,
  target: getQuizzesCategoriesFx,
});

sample({
  clock: [form_first.formValidated, form_second.formValidated],
  target: goNext,
});

sample({
  // @ts-ignore
  clock: form_third.formValidated,
  source: combine(
    [form_first.$values, form_second.$values, form_third.$values],
    ([f1, f2, f3]) => {
      return {
        ...f1,
        ...f2,
        ...f3,
      };
    },
  ),
  fn: src => {
    return {
      login: src.email,
      password: src.password,
      firstname: src.name,
      lastname: '',
      middlename: '',
      birthday: new Date(),
      age: src.age,
      role: src.userType?.value || 4,
      categories: {
        data: [src.categories],
      },
      city: 'Moskow',
      country: 'Russia',
    };
  },
  target: registerFx,
});

sample({
  clock: registerFx.doneData,
  target: [setIsAuth.prepend(() => true), getMeFx],
});

sample({
  source: getMeFx.doneData,
  target: navigateFx.prepend(() => ROUTES.ONBOARDIBG),
});

registerFx.failData.watch(e => console.log(e.response.data));

export {
  form_first,
  form_second,
  form_third,
  $currentStep,
  goPrev,
  goNext,
  formGate,
  $quizzesCategories,
  submit,
};
