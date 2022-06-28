import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { PrivateNavigationParams } from '~/app/navigations/private/types';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

export const HomeScreen: FC = () => {
  const navigation = useNavigation<PrivateNavigationParams>();

  return (
    <Container>
      <Text>Home</Text>
      <TestView>
        <Text>teste</Text>
      </TestView>
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

const TestView = styled(View).attrs(({ theme }) => ({
  shadowColor: theme.colors.neutral.black,
  elevation: theme.elevations.dp12,
  ...theme.shadows.dp12,
}))`
  padding: 8px;
  margin: 48px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
`;
