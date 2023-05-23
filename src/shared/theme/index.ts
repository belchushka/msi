import React, {useContext} from 'react';

export const themeConfig = {
  colors: {
    green: {
      primary: '#A4CE57',
      800: '#6D8367',
      700: '#64B17E',
      600: '#8EB04D',
      500: '#A4CE57',
      400: '#BBD86A',
      300: '#D0E4A4',
      200: '#F3F4C1a',
    },
    dark: {
      800: '#404041',
      600: '#76787A',
      400: '#A7A9AB',
      200: '#C6C8CA',
      100: '#E6E7E8',
    },
    purple: {
      800: '#4E3760',
      500: '#8B72AB',
      300: '#C7BBDC',
    },
    pink: {
      800: '#C07290',
      400: '#DEA5BA',
    },
    oceanic: {
      800: '#354863',
      400: '#A3C8D8',
    },
    red: {
      800: '#DC3B3B',
    },
  },
};

export const ThemeContext = React.createContext(themeConfig);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};
