import React, { forwardRef } from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Acordion } from '~/modules/home/components/Acordion/Acordion';
import { ScheduleList } from '~/modules/home/components/ScheduleList/ScheduleList';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';

interface ISchedulesListWithAccordionProps {
  scheduleIndex?: number | null;
  data: ISchedulesListItem[];
}

export const SchedulesListWithAccordion = forwardRef<
  FlatList<ISchedulesListItem>,
  ISchedulesListWithAccordionProps
>(({ data, scheduleIndex }, ref) => {
  return (
    <FlatList
      onScrollToIndexFailed={() => {}}
      initialScrollIndex={scheduleIndex}
      ref={ref}
      data={data}
      keyExtractor={(item) => item.date}
      renderItem={({ item, index }) => (
        <AcordionListWrapper key={index}>
          <Acordion
            beginOpenned={scheduleIndex === index}
            forceClosing={scheduleIndex !== index}
            title={new Date(item.date).toLocaleDateString()}>
            <ScrollView>
              <ScheduleList appointments={item.appointments} />
            </ScrollView>
          </Acordion>
        </AcordionListWrapper>
      )}
    />
  );
});

const AcordionListWrapper = styled.View<{ isLast?: boolean }>`
  margin-bottom: ${({ isLast }) => (isLast ? '0px' : '16px')};
`;
