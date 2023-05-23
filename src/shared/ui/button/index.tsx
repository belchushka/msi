import {useTheme} from '@/shared/theme';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {IButton} from './types';

const getButtonStyles = (
  variant: IButton['variant'],
  theme: ReturnType<typeof useTheme>,
) => {
  switch (variant) {
    case 'filled': {
      return {
        button: styles.button_filled,
        text: {
          color: theme.colors.dark['800'],
        },
      };
    }
    case 'outline': {
      return {
        button: styles.button_outline,
        text: {
          color: 'white',
        },
      };
    }
    case 'primary': {
      return {
        button: {
          backgroundColor: theme.colors.green.primary,
          borderColor: theme.colors.green.primary,
        },
        text: {
          color: 'white',
        },
      };
    }
  }
};

export const Button: React.FC<IButton> = ({
  variant = 'filled',
  children,
  style,
  fullWidth = false,
  disabled = false,
  color,
  textColor,
  ...props
}) => {
  const theme = useTheme();
  const buttonStyles = getButtonStyles(variant, theme);
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        style,
        styles.button,
        buttonStyles?.button,
        fullWidth && {
          alignSelf: 'stretch',
        },
        disabled && {
          backgroundColor: theme.colors.dark[100],
          borderColor: theme.colors.dark[100],
          opacity: 0.8,
        },
        typeof color !== 'undefined' && {
          backgroundColor: color,
          borderColor: color,
        },
      ]}>
      <Text
        style={[
          buttonStyles?.text,
          styles.text,
          typeof textColor !== 'undefined' && {
            color: textColor,
          },
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
