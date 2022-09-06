import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { Typography } from '~/app/components/Typography';

interface IListEmptyStateProps {
  message: string;
  buttonLabel?: string;
  buttonIcon?: string;
  buttonAction?: () => void;
}

export const ListEmptyState: FC<IListEmptyStateProps> = (props) => {
  const { message, buttonLabel, buttonAction, buttonIcon } = props;
  return (
    <EmptyStateContainer>
      <EmptyStateText fontGroup="bodySmallRegular">{message}</EmptyStateText>
      {Boolean(buttonLabel) && (
        <Button
          variant="text"
          icon={buttonIcon}
          iconOrientation="left"
          iconSize={20}
          onPress={buttonAction}>
          {buttonLabel}
        </Button>
      )}
    </EmptyStateContainer>
  );
};

const EmptyStateText = styled(Typography).attrs({
  fontGroup: 'bodySmallRegular',
})`
  text-align: center;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 50px;
`;
