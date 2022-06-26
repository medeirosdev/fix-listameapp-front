import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { PublicNavigation } from '~/app/navigations/public/types';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

export const LoginScreen: FC = () => {
  const navigation = useNavigation<PublicNavigation>();

  return (
    <Container>
      <Text>Login Screen</Text>
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
