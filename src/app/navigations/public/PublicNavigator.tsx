import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { PublicParamList } from '~/app/navigations/public/types';
import { LoginScreen } from '~/modules/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator<PublicParamList>();

export const PublicNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'ListaMe', headerShown: false }}
      />
    </Stack.Navigator>
  );
};
