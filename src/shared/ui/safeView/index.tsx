import {IWithChildren, IWithStyle} from '@/shared/types';
import React from 'react';
import {StatusBar, View} from 'react-native';

export const SafeView: React.FC<IWithStyle & IWithChildren> = ({
  style,
  children,
}) => {
  return (
    <View
      style={[
        style,
        {
          paddingTop: StatusBar.currentHeight,
        },
      ]}>
      <StatusBar barStyle="dark-content" />
      {children}
    </View>
  );
};
