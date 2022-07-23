import React, { FC, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateNavigator } from '~/app/navigations/private/PrivateNavigator';
import { PublicNavigator } from '~/app/navigations/public/PublicNavigator';
import { useAuthStatus } from '~/modules/auth/hooks/useAuthStatus';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { restoreSession } from '~/modules/auth/state/thunks/authThunks';

export const Navigations: FC = () => {
  const { isAuthenticated, isAuthenticatedRestoring } = useAuthStatus();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  useEffect(() => {
    if (!isAuthenticatedRestoring) RNBootSplash.hide();
  }, [isAuthenticatedRestoring]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
};
