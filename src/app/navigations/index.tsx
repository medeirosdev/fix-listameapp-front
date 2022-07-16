import React, { FC, useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { PublicNavigator } from '~/app/navigations/public/PublicNavigator';
import { PrivateNavigator } from '~/app/navigations/private/PrivateNavigator';
import { SplashScreen } from '~/modules/auth/screens/SplashScreen';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));

export const Navigations: FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // delay(6000).then(() => setIsLogged(true));
  }, []);

  useEffect(() => {
    if (isLogged) {
    }
  }, [isLogged]);

  // if (!isLogged) {
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      {/* <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}> */}
      <PrivateNavigator />
    </NavigationContainer>
  );
};
