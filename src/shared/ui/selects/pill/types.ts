import {IWithStyle} from '@/shared/types';

export type PillSelectValue<T = any> = {
  id: number | string;
  value: T;
  label: string;
};

export interface IPill {
  value: PillSelectValue;
  selected: boolean;
  onPress: (value: PillSelectValue) => void;
}

export interface IPillSelect extends IWithStyle {
  onSelect: (val: PillSelectValue) => void;
  data: Array<PillSelectValue>;
  value: PillSelectValue | null;
  multiple?: boolean;
}
