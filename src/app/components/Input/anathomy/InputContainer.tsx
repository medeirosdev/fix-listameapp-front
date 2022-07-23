import { View } from 'react-native';
import styled from 'styled-components/native';
import { InputVariants } from '../types';

interface IInputContainerProps {
  variant: InputVariants;
  isFocused?: boolean;
  hasError?: boolean;
}

export const InputContainer = styled(View)<IInputContainerProps>`
  width: 100%;
  height: 60px;
  pointer-events: none;
  position: relative;
  flex-direction: column-reverse;
  border-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme: { colors } }) => colors.brand};

  ${({ theme: { colors }, variant, isFocused, hasError }) => {
    if (hasError) return { borderColor: colors.error };
    if (variant === 'fullWhite')
      return {
        borderColor: isFocused ? colors.neutral.white : colors.gray[300],
      };
  }};
`;
