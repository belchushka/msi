import { TouchableOpacityProps } from 'react-native';

export interface IStydyComponent extends Omit<TouchableOpacityProps, 'children' | 'activeOpacity'> {
    progress: number,
    maxProgress: number,
    isActive: boolean, 
    isDone: boolean,
    title: string,
    onPress: () => void;
    active_icon: string
}
