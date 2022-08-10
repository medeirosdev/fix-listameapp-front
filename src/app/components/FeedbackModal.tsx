import React, { FC, useMemo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { ButtonProps } from '~/app/components/Button/types';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import {
  EmailFeedbackTemplates,
  EMAIL_FEEDBACK,
} from '~/modules/auth/utils/constants/email';

export interface IFeedbackModalProps {
  cancelAction?: ButtonProps['onPress'];
  confirmAction?: ButtonProps['onPress'];
  cancelText?: string;
  confirmText?: string;
  message?: string;
  isSingleAction?: boolean;
  visible?: boolean;
  onClose: () => void;
  email?: {
    template: EmailFeedbackTemplates;
    value: string;
  };
}

export const FeedbackModal: FC<IFeedbackModalProps> = (props) => {
  const {
    cancelAction,
    confirmAction,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    message = '',
    isSingleAction,
    visible = false,
    onClose,
    email,
  } = props;
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalView: {
          marginHorizontal: 20,
          backgroundColor: theme.colors.neutral.white,
          borderRadius: theme.radii.xs,
          padding: 24,
          alignItems: 'center',
          shadowColor: theme.colors.neutral.black,
          ...theme.shadows.dp12,
          elevation: theme.elevations.dp12,
        },
      }),
    [theme],
  );

  return (
    <CenteredView>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          onClose();
        }}>
        <ContentContainer>
          <View style={styles.modalView}>
            {!message && !!email?.template && (
              <>
                <Typography fontGroup="bodyRegular">
                  {EMAIL_FEEDBACK[email.template].concat(' ')}
                  <Typography
                    fontGroup="bodyRegular"
                    color={theme.colors.brand}>
                    {email?.value}
                  </Typography>
                </Typography>
              </>
            )}
            {!!message && (
              <Typography fontGroup="bodyRegular">{message}</Typography>
            )}
            <Row mt={24} justifyContent="space-evenly">
              {!isSingleAction && (
                <ButtonWithMargin
                  onPress={() => {
                    cancelAction?.();
                    onClose();
                  }}
                  variant="outlined">
                  {cancelText}
                </ButtonWithMargin>
              )}
              <Button
                fullWidth={isSingleAction}
                onPress={() => {
                  confirmAction?.();
                  onClose();
                }}>
                {confirmText}
              </Button>
            </Row>
          </View>
        </ContentContainer>
      </Modal>
    </CenteredView>
  );
};

const CenteredView = styled.View.attrs({
  justifyContent: 'center',
  alignItems: 'center',
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(CenteredView)`
  background-color: ${({ theme: { colors } }) => colors.neutral.overlay};
`;

const ButtonWithMargin = styled(Button)`
  margin-right: 8px;
`;
