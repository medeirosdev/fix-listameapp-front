import React from 'react';
import { Controller } from 'react-hook-form';
import { IFormRowProps } from '~/app/components/Form/types';
import { Input } from '~/app/components/Input';
import { Row } from '~/app/components/Row';

export const FormRow: IFormRowProps = ({ control, input, spacing }) => {
  const { name, rules, onChangeText, onBlur, ...rest } = input;

  return (
    <Row mb={spacing}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur: controllerOnBlur, value } }) => (
          <Input
            {...rest}
            onChangeText={(text) => {
              onChangeText?.(text);
              onChange(text);
            }}
            onBlur={(event) => {
              onBlur?.(event);
              controllerOnBlur();
            }}
            value={value}
          />
        )}
      />
    </Row>
  );
};
