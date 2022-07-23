import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Platform } from 'react-native';
import { Row } from '~/app/components/Row';
import { TextAlert } from '~/app/components/TextAlert';
import { renderChildrenWithProps } from '~/app/utils/renderChildrenWithProps';
import {
  IFormChildrenProps,
  IFormInputProps,
  FormProps,
} from '~/app/components/Form/types';
import { FormRow } from '~/app/components/Form/anathomy/FormRow';

export const Form = (props: FormProps) => {
  const { inputs, defaultValues, alert, children, rowsSpacing = 16 } = props;
  const headerHeight = useHeaderHeight();

  const { control, handleSubmit, getFieldState } = useForm({
    defaultValues,
  });

  if (!inputs.length) return <></>;

  return (
    <FormContainer
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      {inputs.map((input: IFormInputProps, index) => {
        input.error = getFieldState(input.name as any).error?.message || '';
        return (
          <FormRow
            key={`${input.name}_${index}_${inputs.length}`}
            control={control}
            input={input}
            spacing={rowsSpacing}
          />
        );
      })}
      {Boolean(alert?.message) && (
        <Row mb={rowsSpacing}>
          <TextAlert
            message={alert?.message || ''}
            type={alert?.type || 'info'}
          />
        </Row>
      )}
      {renderChildrenWithProps<IFormChildrenProps>(children, { handleSubmit })}
    </FormContainer>
  );
};

const FormContainer = styled.KeyboardAvoidingView``;
