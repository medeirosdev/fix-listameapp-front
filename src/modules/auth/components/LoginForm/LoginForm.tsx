import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { PrivateNavigationParams } from '~/app/navigations/private/types';
import { Form } from '~/app/components/Form/Form';
import { useLoginFormInputs } from '~/modules/auth/hooks/useLoginFormInputs';
import { ITextAlertProps } from '~/app/components/TextAlert';
import { LoginFormFooter } from '~/modules/auth/components/LoginForm/LoginFormFooter';
import { createSession } from '~/modules/auth/state/thunks/authThunks';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { useAuthStatus } from '~/modules/auth/hooks/useAuthStatus';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { authErrorMessageSelector } from '~/modules/auth/state/selectors/authSelectors';

export type FormFieldType = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigation = useNavigation<PrivateNavigationParams>();
  const [alert, setAlert] = useState<ITextAlertProps | undefined>();
  const { inputs } = useLoginFormInputs();
  const { isAuthenticationLoading: isLoading } = useAuthStatus();
  const loginError = useAppSelector(authErrorMessageSelector);
  const dispatch = useAppDispatch();

  const onSubmitSuccess: SubmitHandler<FormFieldType> = async (fields) => {
    await dispatch(createSession(fields));
  };

  useEffect(() => {
    if (loginError) {
      setAlert({
        type: 'error',
        message: loginError,
      });
    }
  }, [loginError]);

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = (errors) => {
    const { email, password } = errors;
    if ([email?.type, password?.type].includes('required')) {
      setAlert({
        type: 'warning',
        message: 'Preencha os campos obrigatórios',
      });
    }
  };

  return (
    <Form inputs={inputs} alert={alert}>
      <LoginFormFooter
        isLoading={isLoading}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFailure={onSubmitFailure}
        alternativeAction={() => navigation.navigate('Schedules')}
      />
    </Form>
  );
};
