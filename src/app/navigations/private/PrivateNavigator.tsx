import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { PrivateParamList } from '~/app/navigations/private/types';
import { HomeScreen } from '~/modules/home/screens/HomeScreen';
import { SchedulesScreen } from '~/modules/schedule/screens/SchedulesScreen';

const Stack = createNativeStackNavigator<PrivateParamList>();

export const PrivateNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Stack.Screen
        name="Schedules"
        component={SchedulesScreen}
        options={{ title: 'Agendas' }}
      />
    </Stack.Navigator>
  );
};
