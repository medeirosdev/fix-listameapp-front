import { AppErrorCodeEnum } from '~/app/types/AppErrorCodeEnum';

export const getErrorMessageByErrorCode = (
  code: AppErrorCodeEnum = AppErrorCodeEnum.UNKNOWN,
): string => {
  const messages = new Map<AppErrorCodeEnum, string>();
  messages.set(
    AppErrorCodeEnum.SESSION_CREATE_ERROR,
    'Credenciais inválidas, tente novamente',
  );
  messages.set(AppErrorCodeEnum.UNKNOWN, 'Algo deu errado, tente novamente');
  messages.set(
    AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
    'Erro interno, tente novamente mais tarde',
  );

  return messages.get(code) as string;
};
