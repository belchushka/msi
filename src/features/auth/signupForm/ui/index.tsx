import {Button, Input, PillSelect, Stepper} from '@/shared/ui';
import {useForm} from 'effector-forms';
import {useEvent, useGate, useStore} from 'effector-react';
import React from 'react';
import {Text, View} from 'react-native';
import {userTypes} from '../lib';
import {
  $currentStep,
  $quizzesCategories,
  form,
  formGate,
  goNext,
  goPrev,
  submit,
} from '../model';
import styles from './styles';

const stepTitles = [
  'Давайте знакомиться!',
  'Расскажите о себе',
  'Выбери направлание',
];

const stepValidFields = [
  ['name', 'email', 'password', 'repeatPassword'],
  ['age', 'userType'],
  ['categories'],
];

const FirstStep = () => {
  const {fields, hasError} = useForm(form);
  return (
    <View style={styles.firstForm_container}>
      <Input
        value={fields.name.value}
        onChangeText={fields.name.onChange}
        placeholder="Имя *"
        error={hasError('name')}
      />
      <Input
        autoCapitalize="none"
        value={fields.email.value}
        inputMode="email"
        onChangeText={fields.email.onChange}
        placeholder="Email *"
        error={hasError('email')}
      />
      <Input
        secureTextEntry
        value={fields.password.value}
        onChangeText={fields.password.onChange}
        placeholder="Пароль *"
        error={hasError('password')}
      />
      <Input
        secureTextEntry
        value={fields.repeatPassword.value}
        onChangeText={fields.repeatPassword.onChange}
        placeholder="Повторите пароль *"
        error={hasError('repeatPassword')}
      />
    </View>
  );
};

const SecondStep = () => {
  const {fields, hasError} = useForm(form);
  return (
    <View style={styles.firstForm_container}>
      <Input
        error={hasError('age')}
        value={fields.age.value}
        onChangeText={fields.age.onChange}
        keyboardType="numeric"
        placeholder="Возраст"
      />
      <PillSelect
        data={userTypes}
        value={fields.userType.value}
        onSelect={fields.userType.onChange}
      />
    </View>
  );
};

const ThirdStep = () => {
  const {fields} = useForm(form);
  const categories = useStore($quizzesCategories);
  return (
    <View style={styles.firstForm_container}>
      <PillSelect
        data={categories}
        value={fields.categories.value}
        onSelect={fields.categories.onChange}
      />
    </View>
  );
};

export const SignupForm = () => {
  const currentStep = useStore($currentStep);
  const next = useEvent(goNext);
  const prev = useEvent(goPrev);
  const {hasError} = useForm(form);
  const submitForm = useEvent(submit);

  const goNextDisabled = stepValidFields[currentStep]?.some(el =>
    hasError(el as any),
  );
  useGate(formGate);
  return (
    <View style={[styles.container]}>
      <View style={styles.topView}>
        <Text style={styles.topView_title}>Шаг {currentStep + 1}.</Text>
        <Text style={styles.topView_subtitle}>{stepTitles[currentStep]}</Text>
      </View>
      <Stepper style={styles.stepper} currentStep={currentStep}>
        <Stepper.Step>
          <FirstStep />
        </Stepper.Step>
        <Stepper.Step>
          <SecondStep />
        </Stepper.Step>
        <Stepper.Step>
          <ThirdStep />
        </Stepper.Step>
      </Stepper>
      <View style={styles.bottomView}>
        <Button
          disabled={goNextDisabled}
          onPress={() => (currentStep < 2 ? next() : submitForm())}>
          Далее
        </Button>
        {currentStep > 0 && (
          <Button onPress={prev} variant="outline">
            Назад
          </Button>
        )}
      </View>
    </View>
  );
};
