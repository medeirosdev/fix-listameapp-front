import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { DrawerNavigator } from '~/app/navigations/private/DrawerNavigator/DrawerNavigator';
import { PrivateBridgeParamList } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { FiltersScreen } from '~/modules/home/screens/FiltersScreen';

const Stack = createNativeStackNavigator<PrivateBridgeParamList>();

export const PrivateNavigatorBridge: FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        statusBarStyle: 'light',
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Filtros',
          headerBackTitle: 'Início',
          headerTitleStyle: {
            fontSize: theme.fontSizes.h6,
            color: theme.colors.neutral.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};
