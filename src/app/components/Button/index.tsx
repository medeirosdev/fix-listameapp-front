import React, { FC, useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { ButtonProps } from './types/button-props.interface';
import { ThemeFontSizesKeys } from '~/app/theme/fontSizes';
import * as Anathomy from './anathomy';

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    onPress,
    variant,
    size,
    family,
    isDisabled,
    isLoading,
    icon,
    iconSize,
    labelColor,
    fullWidth,
    iconOrientation,
    ...rest
  } = props;
  const theme = useTheme();

  const styles = useMemo(() => {
    if (isDisabled)
      return {
        bg: variant === 'text' ? 'transparent' : theme.colors.gray[300],
        label: theme.colors.gray[400],
        borderColor: variant !== 'text' ? '' : theme.colors.gray[300],
        size: size,
        family,
      };

    switch (variant) {
      case 'outlined':
        return {
          bg: 'transparent',
          label: labelColor ?? theme.colors.primary.blue[700],
          borderColor: theme.colors.primary.blue[700],
          size: size,
          family,
        };
      case 'text':
        return {
          bg: 'transparent',
          label: labelColor ?? theme.colors.primary.blue[700],
          size: size,
          family,
        };
      case 'whiteFilled':
        return {
          bg: theme.colors.neutral.white,
          label: labelColor ?? theme.colors.primary.blue[700],
          size: size,
          family,
        };
      case 'whiteOutlined':
        return {
          bg: 'transparent',
          label: labelColor ?? theme.colors.neutral.white,
          borderColor: theme.colors.neutral.white,
          size: size,
          family,
        };
      default:
        return {
          bg: theme.colors.primary.blue['700'],
          label: labelColor ?? theme.colors.neutral.white,
          size: size,
          family,
        };
    }
  }, [isDisabled, variant]);

  const hasIcon = !isLoading && icon;

  return (
    <Anathomy.ButtonContainer
      isLoading={isLoading}
      iconOrientation={iconOrientation}
      bg={styles.bg}
      borderColor={styles.borderColor}
      fullWidth={fullWidth}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.6}
      {...rest}>
      {isLoading ? (
        <Anathomy.Spinner size={RFValue(16)} color={styles.label} />
      ) : (
        <>
          <Anathomy.BaseLabel
            family={styles.family}
            color={styles.label}
            size={styles.size as ThemeFontSizesKeys}>
            {children}
          </Anathomy.BaseLabel>
          {hasIcon && (
            <Anathomy.BaseIcon
              name={icon as string}
              size={iconSize}
              color={styles.label}
            />
          )}
        </>
      )}
    </Anathomy.ButtonContainer>
  );
};

Button.defaultProps = {
  variant: 'primary',
  size: 'button',
  family: 'regular',
  iconSize: 20,
  fullWidth: true,
  iconOrientation: 'right',
};
