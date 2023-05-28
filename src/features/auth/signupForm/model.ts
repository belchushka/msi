import {AuthApi, setIsAuth} from '@/entities/auth';
import {QuizApi} from '@/entities/quiz';
import {validators} from '@/shared/forms';
import {navigateFx, ROUTES} from '@/shared/router';
import {PillSelectValue} from '@/shared/ui';
import {attach, createEvent, createStore, sample} from 'effector';
import {createForm, Rule} from 'effector-forms';
import {createGate} from 'effector-react';

const goNext = createEvent();
const goPrev = createEvent();
const reset = createEvent();
const submit = createEvent();

const getQuizzesCategoriesFx = attach({effect: QuizApi.getQuizCategoriesFx});

const registerFx = attach({effect: AuthApi.registerFx});

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

const form = createForm({
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
    age: {
      init: '',
      rules: [validators.minValue(5) as Rule<any>],
    },
    userType: {
      init: null as null | PillSelectValue<number>,
      rules: [validators.isNotNull],
    },
    categories: {
      init: null as null | PillSelectValue<string>,
    },
  },
  validateOn: ['change'],
});

sample({
  clock: formGate.close,
  target: [form.reset, reset],
});

sample({
  clock: formGate.open,
  target: getQuizzesCategoriesFx,
});

sample({
  // @ts-ignore
  clock: submit,
  source: form.$values,
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
  target: [
    setIsAuth.prepend(() => true),
    navigateFx.prepend(() => ROUTES.ONBOARDIBG),
  ],
});

registerFx.failData.watch((e)=>console.log(e.response.data))

export {
  form,
  $currentStep,
  goPrev,
  goNext,
  formGate,
  $quizzesCategories,
  submit,
};
