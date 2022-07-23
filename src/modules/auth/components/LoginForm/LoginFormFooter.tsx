import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '~/app/components/Button';
import { IFormChildrenProps } from '~/app/components/Form/types';
import { Row } from '~/app/components/Row';

interface ILoginFormFooterProps extends IFormChildrenProps {
  isLoading?: boolean;
  onSubmitSuccess: (...args: any[]) => void;
  onSubmitFailure: (...args: any[]) => void;
  alternativeAction?: (...args: any[]) => void;
}

export const LoginFormFooter = (props: ILoginFormFooterProps) => {
  const theme = useTheme();
  const {
    handleSubmit,
    isLoading,
    onSubmitSuccess,
    onSubmitFailure,
    alternativeAction,
  } = props;
  return (
    <View>
      <Row alignSelf="center">
        <Button
          size="bodySmall"
          labelColor={theme.colors.neutral.white}
          variant="text">
          Esqueci minha senha
        </Button>
      </Row>
      <Row mb={16}>
        <Button
          isLoading={isLoading}
          variant="whiteFilled"
          onPress={handleSubmit?.(onSubmitSuccess, onSubmitFailure)}>
          Entrar
        </Button>
      </Row>
      <Row>
        <Button variant="whiteOutlined" onPress={alternativeAction}>
          Criar nova conta
        </Button>
      </Row>
    </View>
  );
};
