import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconOrientations } from './icon-orientations.type';
import { ThemeFontSizesKeys } from '~/app/theme/fontSizes';
import { ThemeTypographyKeys } from '~/app/theme/typography';
import { ButtonVariants } from '.';

interface ButtonWrapperProps {
  variant?: ButtonVariants;
  size?: ThemeFontSizesKeys;
  family?: ThemeTypographyKeys;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  icon?: string;
  iconSize?: number;
  labelColor?: string;
  fullWidth?: boolean;
  iconOrientation?: IconOrientations;
}

export type ButtonProps = ComponentProps<typeof TouchableOpacity> &
  ButtonWrapperProps;
