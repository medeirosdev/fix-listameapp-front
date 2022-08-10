import React, { FC } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { Row } from '~/app/components/Row';
import { TextAlert } from '~/app/components/TextAlert';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { deleteTokenFromSafeStorage } from '~/modules/auth/services/storage/safeStorage';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';
import { authActions } from '~/modules/auth/state/slices/authSlices';

export const HomeScreen: FC = () => {
  const user = useAppSelector(currentUserSelector);
  const dispatch = useDispatch();

  const logout = async () => {
    await deleteTokenFromSafeStorage();
    await dispatch(authActions.resetWithNewStatus('GUEST'));
  };

  return (
    <Container>
      <TextAlert type="success" message={user?.name || 'No user name'} />
      <Row mt={16}>
        <Button fullWidth onPress={logout}>
          Logout
        </Button>
      </Row>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  margin: 0px 20px;
  align-items: center;
  justify-content: center;
`;
