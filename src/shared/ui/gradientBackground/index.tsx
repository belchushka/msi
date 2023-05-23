import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {IGrandientBackground} from './types';

export const GradientBackground: React.FC<IGrandientBackground> = ({
  children,
  colors,
  style,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0, 0.5]}
      colors={colors}
      style={style}>
      {children}
    </LinearGradient>
  );
};
