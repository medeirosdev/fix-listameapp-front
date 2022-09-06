import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { SchedulesCalendar } from '~/modules/home/components/SchedulesCalendar/SchedulesCalendar';
import { DateData } from 'react-native-calendars';
import { useFilterByDate } from '~/modules/home/hooks/useFilterByDate';

export type SelectDateBottomShetTypes = 'start' | 'end';
export type OnStartDateChange = (startDate: DateData) => void;
export type OnEndDateChange = (endDate: DateData) => void;

export const SelectDateBottomSheet = () => {
  const {
    bottomSheetOpenType,
    filterDateRange,
    onStartDateChange,
    onEndDateChange,
  } = useFilterByDate();
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '65%'], []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 2,
        ...theme.shadows.dp24,
        shadowColor: '#000',
        elevation: theme.elevations.dp24,
        padding: 24,
      },
      background: {
        borderRadius: theme.radii.xxl,
      },
    });
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      style={styles.container}
      backgroundStyle={styles.background}>
      <ContentContainerView>
        <ContentTitle fontGroup="bodyLargeMedium">
          Selecione a data{' '}
          {bottomSheetOpenType === 'start' ? 'inicial' : 'final'}
        </ContentTitle>
        <SchedulesCalendar
          datesRange={[
            filterDateRange?.start?.value || '',
            filterDateRange?.end?.value || '',
          ]}
          onDateSelect={
            bottomSheetOpenType === 'start'
              ? onStartDateChange
              : onEndDateChange
          }
        />
      </ContentContainerView>
    </BottomSheet>
  );
};

const ContentContainerView = styled.View`
  flex: 2;
`;

const ContentTitle = styled(Typography)`
  margin: 16px 0px;
  text-align: center;
`;
