import React, { FC } from 'react';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import {
  PrivateBridgeNavigationParams,
  PrivateBridgeNavigationScreenProps,
  PrivateBridgeNavigationScreenPropsGeneric,
} from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { AgendaListItem } from '~/modules/schedule/components/AgendaListItem/AgendaListItem';
import { SchedulesListWithAccordion } from '~/modules/schedule/components/SchedulesListWithAccordion/SchedulesListWithAccordion';
import { useScheduleDetails } from '~/modules/schedule/hooks/useScheduleDetails';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';

export const ScheduleDetailsScreen: FC<
  PrivateBridgeNavigationScreenPropsGeneric<'ScheduleDetails'>
> = ({ route: { params } }) => {
  const { agenda, appointments } = useScheduleDetails(params.id);

  if (!agenda) return <></>;

  return (
    <ScheduleDetailsScreenPageContainer>
      <HeaderRow>
        <AgendaListItem
          avatar={agenda.avatar}
          name={agenda.name}
          owner={agenda.user?.name}
        />
      </HeaderRow>
      <HeaderSubtitleRow>0 seguidores</HeaderSubtitleRow>
      <LayoutContainer>
        <Typography fontGroup="h6Bold">Descrição</Typography>
        <DescriptionText>{agenda.description}</DescriptionText>
        <AgendaAppointmentsView>
          {!appointments?.length ? (
            <ListEmptyState message="Nenhum registro para esta agenda" />
          ) : (
            <SchedulesListWithAccordion data={appointments || []} />
          )}
        </AgendaAppointmentsView>
      </LayoutContainer>
    </ScheduleDetailsScreenPageContainer>
  );
};

export const ScheduleDetailsScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
  padding: 16px 24px;
`;

const HeaderSubtitleRow = styled(Typography)`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  text-align: right;
  padding: 16px 24px;
`;

const DescriptionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const AgendaAppointmentsView = styled.View`
  flex: 1;
`;
