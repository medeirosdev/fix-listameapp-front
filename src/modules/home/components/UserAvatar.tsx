import React, { FC, useMemo } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StyledProps } from 'styled-components';
import styled, { useTheme } from 'styled-components/native';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { getUserNames } from '~/app/utils/format/getUserNames';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';

type UserAvatarVariants = 'smallWhite' | 'smallBlue' | 'medium';

interface IUserAvatarProps {
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  variant?: UserAvatarVariants;
}

export const UserAvatar: FC<IUserAvatarProps> = ({ onPress, variant }) => {
  const theme = useTheme();
  const user = useAppSelector(currentUserSelector);
  const hasAvatar = Boolean(user?.avatar_url);

  const variantStyles = useMemo(() => {
    const defaultStyle = {
      height: 28,
      width: 28,
      maxWidth: 28,
      isGradient: false,
      bordered: true,
      fontGroup: 'captionBold',
      fontColor: theme.colors.brand,
      backgroundColor: theme.colors.neutral.white,
    };

    const styles = new Map<UserAvatarVariants, typeof defaultStyle>();
    styles.set('smallWhite', { ...defaultStyle, bordered: false });
    styles.set('medium', {
      width: 48,
      maxWidth: 48,
      height: 48,
      isGradient: true,
      bordered: false,
      fontGroup: 'bodyMedium',
      fontColor: theme.colors.neutral.white,
      backgroundColor: '',
    });

    if (!variant) return defaultStyle;

    return styles.get(variant) ?? defaultStyle;
  }, [variant]);

  const { isGradient, bordered, fontGroup, fontColor, ...styles } =
    variantStyles;
  const Container = isGradient ? AvatarContainerGradient : AvatarContainer;

  return (
    <Container bordered={bordered || hasAvatar} style={styles}>
      <TouchableWithoutFeedback onPress={onPress}>
        {hasAvatar ? (
          <Image
            source={{
              uri: user?.avatar_url || '',
              width: styles.width,
              height: styles.height,
            }}
            borderRadius={50}
          />
        ) : (
          <AvatarUserName color={fontColor} fontGroup={fontGroup}>
            {getUserNames(user?.name, true)}
          </AvatarUserName>
        )}
      </TouchableWithoutFeedback>
    </Container>
  );
};

export const AvatarContainerGradient = styled(GradientContainerView)<{
  bordered: boolean;
}>`
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
  border: ${({ bordered, theme: { colors } }) =>
    bordered ? `2px solid ${colors.primary.blue[300]}` : 'none'};
`;

export const AvatarContainer = styled(View)<{
  bordered: boolean;
}>`
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
  border: ${({ bordered, theme: { colors } }) =>
    bordered ? `2px solid ${colors.primary.blue[300]}` : 'none'};
  align-items: center;
  justify-content: center;
`;

export const AvatarUserName = styled(Typography)<{ color?: string }>`
  color: ${({ color, theme: { colors } }) => color ?? colors.neutral.white};
`;
