import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PublicNavigator } from '~/app/navigations/public/PublicNavigator';
import { PrivateNavigator } from '~/app/navigations/private/PrivateNavigator';

export const Navigations: FC = () => {
  const isLogged = true;
  return (
    <NavigationContainer>
      {isLogged ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
};
