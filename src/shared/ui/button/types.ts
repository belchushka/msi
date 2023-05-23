import {TouchableOpacityProps} from 'react-native';

export interface IButton extends Omit<TouchableOpacityProps, 'children'> {
  variant?: 'filled' | 'outline' | 'primary';
  children: string;
  fullWidth?: boolean;
  disabled?: boolean;
  color?: string;
  textColor?: string;
}
