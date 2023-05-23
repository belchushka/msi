import {IWithChildren} from '@/shared/types';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {IStepper} from './types';

const Step: React.FC<IWithChildren> = ({children}) => {
  return <View>{children}</View>;
};

export const Stepper = ({children, currentStep, style}: IStepper) => {
  const childrenArray = React.Children.toArray(children) as Array<ReactElement>;
  const currentChild =
    childrenArray[currentStep] || childrenArray[childrenArray.length - 1];
  return <View style={style}>{React.cloneElement(currentChild, {})}</View>;
};

Stepper.Step = Step;
