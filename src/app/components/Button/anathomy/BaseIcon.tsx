import styled from 'styled-components/native';
import { Icon } from '~/app/components/Icon';

interface IBaseIconProps {
  color: string;
}

export const BaseIcon = styled(Icon)<IBaseIconProps>`
  margin-horizontal: 8px;
  color: ${(props) => props.color};
`;
