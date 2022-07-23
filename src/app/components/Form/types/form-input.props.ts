import { UseControllerProps } from 'react-hook-form';
import { IInputProps } from '~/app/components/Input/types';

export interface IFormInputProps extends IInputProps {
  name: string;
  rules: UseControllerProps['rules'];
}
