import {IWithStyle} from '@/shared/types';
import {ReactElement} from 'react';

export interface IStepper extends IWithStyle {
  currentStep: number;
  children: ReactElement | Array<ReactElement>;
}
