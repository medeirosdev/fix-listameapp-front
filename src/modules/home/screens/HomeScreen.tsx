import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { PrivateNavigationParams } from '~/app/navigations/private/types';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

export const HomeScreen: FC = () => {
  const navigation = useNavigation<PrivateNavigationParams>();

  return (
    <Container>
      <Text>Home Screen</Text>
      <Button
        title="Go to Schedules"
        onPress={() => navigation.navigate('Schedules')}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
