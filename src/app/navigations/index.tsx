import React, { FC } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateNavigator } from '~/app/navigations/private/PrivateNavigator';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));

export const Navigations: FC = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
      <PrivateNavigator />
    </NavigationContainer>
  );
};
