import React, { FC, memo } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const SplashScreen: FC = memo(() => {
  return <LinearGradientContainer />;
});

const LinearGradientContainer = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.brand.stops,
  useAngle: true,
  angle: theme.colors.brand.angle || 0,
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
