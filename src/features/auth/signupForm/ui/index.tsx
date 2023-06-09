import {Button, Input, PillSelect, Stepper} from '@/shared/ui';
import {useForm} from 'effector-forms';
import {useEvent, useGate, useStore} from 'effector-react';
import React from 'react';
import {Text, View} from 'react-native';
import {userTypes} from '../lib';

import {
  $currentStep,
  $quizzesCategories,
  form_first,
  form_second,
  form_third,
  formGate,
  goNext,
  goPrev,
} from '../model';
import styles from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useTheme} from '@/shared/theme';

const stepTitles = [
  'Давайте знакомиться!',
  'Расскажите о себе',
  'Выбери направлание',
];

const FirstStep = () => {
  const {fields, hasError, submit} = useForm(form_first);
  const theme = useTheme();
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <BouncyCheckbox
          size={25}
          isChecked={fields.accepted_privacy.value}
          fillColor="#A5D324"
          unfillColor={
            hasError('accepted_privacy') ? theme.colors.red[800] : 'white'
          }
          iconStyle={{borderColor: 'white'}}
          innerIconStyle={{borderWidth: 0}}
          onPress={fields.accepted_privacy.onChange}
        />
        <Text style={{fontFamily: 'DeeDee', fontSize: 20, color: 'white'}}>
          Согласие на обработку персональных данных
        </Text>
      </View>
      <View style={styles.bottomView}>
        <Button onPress={() => submit()}>Далее</Button>
      </View>
    </View>
  );
};

const SecondStep = () => {
  const {fields, hasError, submit} = useForm(form_second);
  const prev = useEvent(goPrev);

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
      <View style={styles.bottomView}>
        <Button onPress={() => submit()}>Далее</Button>
        <Button onPress={prev} variant="outline">
          Назад
        </Button>
      </View>
    </View>
  );
};

const ThirdStep = () => {
  const {fields, submit} = useForm(form_third);
  const categories = useStore($quizzesCategories);
  const prev = useEvent(goPrev);

  return (
    <View style={styles.firstForm_container}>
      <PillSelect
        data={categories}
        value={fields.categories.value}
        onSelect={fields.categories.onChange}
      />
      <View style={styles.bottomView}>
        <Button onPress={() => submit()}>Далее</Button>
        <Button onPress={prev} variant="outline">
          Назад
        </Button>
      </View>
    </View>
  );
};

export const SignupForm = () => {
  const currentStep = useStore($currentStep);

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
    </View>
  );
};
