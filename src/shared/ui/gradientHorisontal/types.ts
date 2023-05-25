import {IWithChildren, IWithStyle} from '@/shared/types';

export interface IGrandientBackground extends IWithChildren, IWithStyle {
  colors: [string, string];
}
