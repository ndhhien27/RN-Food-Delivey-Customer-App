/* eslint-disable import/prefer-default-export */
const color = {
  orange: '#F35324',
  primary: '#F68A2B',
  gray: '#B8BBC6',
  lightGray: '#EFEFF4',
  lightestGray: '#F3F3F3',
};

export const theme = {
  color,
  text: {
    size: {
      xs: 10,
      sm: 14,
      base: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 32,
    },
    weight: {
      light: '200',
      normal: '400',
      bold: '700',
    },
    spacing: {
      tight: 0.8,
      normal: 1,
      wide: 1.5,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      large: 2,
    },
    fonts: {
      base: null,
      sfui: 'SFUIText-Regular',
      'sfui-bold': 'SFUIText-Semibold',
      'sfui-medium': 'SFUIText-Medium',
    },
  },
  radius: {
    '2xs': 3,
    xs: 8,
    sm: 12,
  },
};
