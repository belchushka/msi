import {ReactNode} from 'react';
import {StyleProp} from 'react-native/types';

export interface IWithChildren {
  children: ReactNode;
}

export interface IWithStyle {
  style?: StyleProp<any>;
}
