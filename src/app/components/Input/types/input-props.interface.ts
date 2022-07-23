import { ComponentPropsWithRef } from 'react';
import { TextInput } from 'react-native';
import { InputVariants } from './input-variants.type';

export interface IInputProps extends ComponentPropsWithRef<typeof TextInput> {
  label: string;
  placeholder?: string;
  iconName?: string;
  variant?: InputVariants;
  helperText?: string;
  error?: string;
  onIconPress?: (...args: unknown[]) => void;
}
