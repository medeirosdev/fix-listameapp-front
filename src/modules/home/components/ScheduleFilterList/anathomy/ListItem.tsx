import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Shadow } from '~/app/components/Shadow';
import { Typography } from '~/app/components/Typography';
import defaultAgendaAvatar from '~/app/assets/agenda-default.png';
import Checkbox from 'react-native-checkbox-animated';
import { IScheduleFilterListProps } from '../ScheduleFilterList';
import { IAgenda } from '~/modules/schedule/types/agendas';

export interface IScheduleFilterListItemProps {
  id: IAgenda['id'];
  name: string;
  owner?: string;
  avatar: string | null;
  checked: boolean;
  onCheckAgenda: IScheduleFilterListProps['onCheckAgenda'];
}

export const ListItem: FC<IScheduleFilterListItemProps> = (props) => {
  const { id, name, owner, avatar, checked, onCheckAgenda } = props;

  return (
    <ListItemShadowContainer dp="dp01">
      <Avatar
        source={
          avatar
            ? {
                uri: avatar,
                width: 48,
                height: 48,
              }
            : defaultAgendaAvatar
        }
      />
      <TextContainer>
        <Title>{name}</Title>
        <Subtitle>{owner}</Subtitle>
      </TextContainer>
      <ListItemCheckbox
        label=""
        onValueChange={(value) => {
          onCheckAgenda(id);
          return value;
        }}
        checked={checked}
      />
    </ListItemShadowContainer>
  );
};

export const ListItemShadowContainer = styled(Shadow)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  overflow: hidden;
  padding: 8px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const Title = styled(Typography).attrs({
  fontGroup: 'bodySmallMedium',
  numberOfLines: 1,
})`
  color: ${({ theme: { colors } }) => colors.gray[900]};
  overflow: hidden;
  width: 80%;
`;

export const Subtitle = styled(Typography).attrs({
  fontGroup: 'captionRegular',
  numberOfLines: 1,
})`
  color: ${({ theme: { colors } }) => colors.gray[600]};
  overflow: hidden;
  width: 80%;
`;

export const Avatar = styled.Image`
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
  margin-right: 8px;
`;

export const ListItemCheckbox = styled(Checkbox).attrs(
  ({ theme, checked }) => ({
    checkStyle: {
      color: theme.colors.neutral.white,
      fontSize: 14,
    },
    boxStyle: {
      backgroundColor: checked ? theme.colors.brand : 'transparent',
    },
  }),
)``;
