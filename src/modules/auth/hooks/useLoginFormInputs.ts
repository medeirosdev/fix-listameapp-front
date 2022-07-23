import { createRef, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { IFormInputProps } from '~/app/components/Form/types';

export const useLoginFormInputs = () => {
  const [isShowingPassword, setIsShowingPassword] = useState(true);
  const passwordInputRef = createRef<TextInput>();

  const emailInput = useMemo<IFormInputProps>(
    () => ({
      name: 'email',
      rules: {
        required: true,
      },
      textContentType: 'emailAddress',
      variant: 'fullWhite',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      onSubmitEditing: () => passwordInputRef.current?.focus(),
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      blurOnSubmit: false,
    }),
    [],
  );

  const passwordInput = useMemo<IFormInputProps>(
    () => ({
      name: 'password',
      rules: {
        required: true,
      },
      ref: passwordInputRef,
      textContentType: 'password',
      variant: 'fullWhite',
      autoCapitalize: 'none',
      returnKeyLabel: 'entrar',
      label: 'Senha',
      placeholder: 'Digite sua senha',
      iconName: isShowingPassword ? 'visibility' : 'visibility_off',
      secureTextEntry: isShowingPassword,
      onIconPress: () => setIsShowingPassword((prev) => !prev),
    }),
    [isShowingPassword],
  );

  return {
    inputs: [emailInput, passwordInput],
  };
};
