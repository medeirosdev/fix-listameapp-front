import { RFValue } from 'react-native-responsive-fontsize';

export interface IThemeFontSizes {
  button: string;
  caption: string;
  body: {
    small: string;
    medium: string;
    large: string;
  };
  subtitle: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export const fontSizes: IThemeFontSizes = {
  button: `${RFValue(16)}px`,
  caption: `${RFValue(12)}px`,
  body: {
    small: `${RFValue(14)}px`,
    medium: `${RFValue(16)}px`,
    large: `${RFValue(18)}px`,
  },
  subtitle: `${RFValue(16)}px`,
  h1: `${RFValue(56)}px`,
  h2: `${RFValue(48)}px`,
  h3: `${RFValue(40)}px`,
  h4: `${RFValue(32)}px`,
  h5: `${RFValue(24)}px`,
  h6: `${RFValue(20)}px`,
};
