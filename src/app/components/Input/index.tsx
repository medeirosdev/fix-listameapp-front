import React, { FC, forwardRef, useMemo, useState } from 'react';
import { IInputProps } from './types';
import * as Anathomy from './anathomy';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import styled from 'styled-components/native';

export const Input: FC<IInputProps> = forwardRef((props, ref) => {
  const {
    variant = 'default',
    helperText,
    label,
    placeholder,
    iconName,
    onBlur,
    onFocus,
    error,
    onIconPress,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const hasIcon = useMemo(() => Boolean(iconName || error), [iconName, error]);
  const hasError = useMemo(() => Boolean(error), [error]);

  const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  return (
    <Wrapper>
      <Anathomy.InputContainer
        variant={variant}
        isFocused={isFocused}
        hasError={hasError}>
        <Anathomy.Label
          variant={variant}
          isFocused={isFocused}
          hasError={hasError}>
          {label}
        </Anathomy.Label>
        <Anathomy.BaseTextInput
          ref={ref}
          variant={variant}
          hasIcon={hasIcon}
          placeholder={placeholder}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          {...(rest as TextInputProps)}
        />
        {hasIcon && (
          <Anathomy.IconContainer>
            <Anathomy.InputIcon
              variant={variant}
              name={hasError ? 'error' : String(iconName)}
              size={20}
              hasError={hasError}
              onPress={onIconPress}
            />
          </Anathomy.IconContainer>
        )}
      </Anathomy.InputContainer>
      <Anathomy.HelperText hasError={hasError} variant={variant}>
        {error ?? helperText}
      </Anathomy.HelperText>
    </Wrapper>
  );
});

const Wrapper = styled.View`
  width: 100%;
`;
