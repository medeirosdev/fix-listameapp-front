import styled from 'styled-components/native';

interface ILayoutContainerProps {
  isCentered?: boolean;
}

export const LayoutContainer = styled.SafeAreaView<ILayoutContainerProps>`
  margin: 0px 24px;
  flex: 1;
  ${({ isCentered }) => {
    if (isCentered)
      return {
        justifyContent: 'space-around',
      };
  }}
`;
