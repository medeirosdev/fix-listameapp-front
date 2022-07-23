import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface IRowProps extends ViewStyle {
  mb?: ViewStyle['marginBottom'];
  mt?: ViewStyle['marginTop'];
  mx?: ViewStyle['marginHorizontal'];
  my?: ViewStyle['marginVertical'];
}

export const Row = styled(View).attrs((props: IRowProps) => ({
  marginBottom: props.mb,
  marginTop: props.mt,
  marginHorizontal: props.mx,
  marginVertical: props.my,
  ...props,
}))`
  flex-direction: row;
  width: 100%;
`;
