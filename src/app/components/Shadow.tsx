import styled from 'styled-components/native';
import { IThemeShadows } from '~/app/theme/shadows';

interface IShadowProps {
  dp: keyof IThemeShadows;
}

export const Shadow = styled.View.attrs<IShadowProps>(
  ({ theme: { shadows, colors }, dp }) => ({
    ...shadows[dp],
    backgroundColor: colors.neutral.white,
  }),
)<IShadowProps>`
  elevation: ${({ theme: { elevations }, dp }) => elevations[dp]};
  border-radius: 8px;
`;
