import React, { FC } from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
interface IDividerWithTextProps {
  text: string;
}

export const DividerWithText: FC<IDividerWithTextProps> = ({ text }) => {
  const theme = useTheme();

  return (
    <DividerContainer>
      <DividerLeftLine />
      <View>
        <Typography
          fontGroup="bodySmallRegular"
          color={theme.colors.neutral.white}>
          {text}
        </Typography>
      </View>
      <DividerRightLine />
    </DividerContainer>
  );
};

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const DividerLeftLine = styled(DividerLine)`
  margin-right: 16px;
`;

const DividerRightLine = styled(DividerLine)`
  margin-left: 16px;
`;
