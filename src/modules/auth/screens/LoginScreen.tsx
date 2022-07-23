import React, { FC } from 'react';
import styled from 'styled-components/native';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import logo from '~/app/assets/logo/bootsplash_logo@1,5x.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { LoginForm } from '~/modules/auth/components/LoginForm/LoginForm';

export const LoginScreen: FC = () => {
  return (
    <GradientContainerView justifyContent="center">
      <Container>
        <Logo source={logo} />
        <LoginForm />
      </Container>
    </GradientContainerView>
  );
};

const Container = styled.SafeAreaView`
  flex: 0.8;
  margin: 0px 16px;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.Image`
  margin-top: ${RFValue(30)}%;
`;
