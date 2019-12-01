/* eslint-disable import/prefer-default-export */
const color = {
  orange: '#F35324',
  primary: '#F68A2B',
  darkGray: '#99999E',
  gray: '#EDEDEE',
  lightGray: '#F2F2F7',
  yellow: '#FFCC00',
  red: '#ff0000',
};

export const theme = {
  color,
  text: {
    size: {
      xs: 10,
      sm: 15,
      md: 17,
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
      sfpt: 'SFProText-Regular',
      'sfpt-bold': 'SFProText-Semibold',
      'sfpt-medium': 'SFProText-Medium',
      sfpd: 'SFProDisplay-Regular',
      'sfpd-bold': 'SFProDisplay-Semibold',
      'sfpd-medium': 'SFProDisplay-Medium',
    },
  },
  radius: {
    '2xs': 4,
    xs: 8,
    sm: 12,
  },
  icon: {
    size: {
      base: 28,
    },
  },
  space: {
    '2xs': 6,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 36,
    xl: 40,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 0 },
  },
};
