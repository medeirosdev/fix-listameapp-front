import React, { forwardRef } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { getScheduleListItemData } from '~/modules/home/utils/mappers/getScheduleListItemData';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';
import { ListItem } from './anathomy/ListItem';

export interface IScheduleListProps {
  appointments: ISchedulesListItem['appointments'];
}

export const ScheduleList = forwardRef<SafeAreaView, IScheduleListProps>(
  ({ appointments }, ref) => {
    if (!appointments?.length) return <></>;

    return (
      <SafeAreaView ref={ref}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => {
            const listItemProps = getScheduleListItemData(item);
            return <ListItem {...listItemProps} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  },
);
