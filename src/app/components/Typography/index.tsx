import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ThemeFontSizesKeys } from '~/app/theme/fontSizes';
import { ThemeTypographyKeys } from '~/app/theme/typography';

export interface TypographyProps extends TextProps {
  family?: ThemeTypographyKeys;
  size?: ThemeFontSizesKeys;
  lineHeight?: number;
  color?: string;
}

export const Typography: FC<TypographyProps> = ({
  family = 'regular',
  size = 'medium',
  lineHeight,
  color,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const fontFamily = theme.typography[family];
  const fontSize = theme.fontSizes[size as ThemeFontSizesKeys];

  const flattenedStyles = StyleSheet.flatten(style);

  return (
    <Text
      {...rest}
      style={[
        { fontFamily, fontSize, lineHeight: lineHeight, color },
        flattenedStyles,
      ]}
    />
  );
};
