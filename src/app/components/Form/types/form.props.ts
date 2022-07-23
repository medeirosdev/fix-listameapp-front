import { PropsWithChildren } from 'react';
import { UseFormProps } from 'react-hook-form';
import { IFormInputProps } from '~/app/components/Form/types/form-input.props';
import { ITextAlertProps } from '~/app/components/TextAlert';

export type FormProps = PropsWithChildren<{
  inputs: IFormInputProps[];
  defaultValues?: UseFormProps['defaultValues'];
  alert?: ITextAlertProps;
  rowsSpacing?: number;
}>;
