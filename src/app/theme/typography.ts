export interface IThemeTypography {
  regular: string;
  bold: string;
  medium: string;
  semibold: string;
}

export type ThemeTypographyKeys = keyof IThemeTypography;

export const typography: IThemeTypography = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  semibold: 'Roboto-Medium',
};
