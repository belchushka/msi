import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@/shared/router';

export const withNavigation = (Component: React.FC) => {
  return (props: {}) => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Component {...props} />
      </NavigationContainer>
    );
  };
};
