import React, { FC } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { TextAlert } from '~/app/components/TextAlert';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';

export const HomeScreen: FC = () => {
  const user = useAppSelector(currentUserSelector);

  return (
    <Container>
      <TextAlert type="success" message={user?.name || ''} />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  margin: 0px 20px;
  align-items: center;
  justify-content: center;
`;
