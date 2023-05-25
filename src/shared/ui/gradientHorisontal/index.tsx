import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {IGrandientBackground} from './types';

export const GradientHorisontal: React.FC<IGrandientBackground> = ({
  children,
  colors,
  style,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.5]}
      colors={colors}
      style={style}>
      {children}
    </LinearGradient>
  );
};
