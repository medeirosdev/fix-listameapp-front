import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { IconOrientations } from '../types';

interface IButtonContainer {
  fullWidth?: boolean;
  isLoading?: boolean;
  iconOrientation?: IconOrientations;
  bg?: string;
  borderColor?: string;
}

export const ButtonContainer = styled.TouchableOpacity<IButtonContainer>`
  ${({ fullWidth }) => fullWidth && 'width: 100%;'};
  flex-direction: ${({ iconOrientation }) =>
    iconOrientation === 'right' ? 'row' : 'row-reverse'};
  justify-content: center;
  align-content: center;
  align-items: center;
  height: ${RFValue(48)}px;
  padding: ${RFValue(10)}px ${RFValue(16)}px;
  min-width: ${RFValue(80)}px;

  border-radius: ${({ theme }) => `${theme.radii.xxl}px`};
  background-color: ${({ bg, theme }) => bg ?? theme.colors.primary.blue[700]};
  ${({ borderColor }) => borderColor && { border: `2px solid ${borderColor}` }};
  opacity: ${(props) => (props.isLoading ? '0.6' : 1)};
`;
