import React from 'react';
import {ThemeContext, themeConfig} from '../../shared/theme';

export const withTheme = (Component: React.FC) => {
  return (props: {}) => {
    return (
      <ThemeContext.Provider value={themeConfig}>
        <Component {...props} />
      </ThemeContext.Provider>
    );
  };
};
