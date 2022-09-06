import React, { FC, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { Icon } from '~/app/components/Icon';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Shadow } from '~/app/components/Shadow';
import { Typography } from '~/app/components/Typography';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { colors } from '~/app/theme/colors';
import { capitalize } from '~/app/utils/format/capitalize';
import { Acordion } from '~/modules/home/components/Acordion/Acordion';
import { FloatingActionButton } from '~/modules/home/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonItem } from '~/modules/home/components/FloatingActionButton/FloatingActionButtonItem';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { ScheduleList } from '~/modules/home/components/ScheduleList/ScheduleList';
import { SchedulesCalendar } from '~/modules/home/components/SchedulesCalendar/SchedulesCalendar';
import { useCalendarSelection } from '~/modules/home/hooks/useCalendarSelection';
import { useScheduleListFilter } from '~/modules/home/hooks/useScheduleListFilter';
import { useSchedulesCalendar } from '~/modules/home/hooks/useSchedulesCalendar';
import { useSchedulesList } from '~/modules/home/hooks/useSchedulesList';

export const HomeScreen: FC = () => {
  const theme = useTheme();
  const navigation = usePrivateNavigation();
  const { isOpen, handleCalendarOpen, selectedMonth, reset } =
    useSchedulesCalendar();
  const { schedulesList } = useSchedulesList();
  const { isFilterLoading, filtersActiveCount, filteredList } =
    useScheduleListFilter();
  const { scheduleIndex, scheduleListRef, calendarDates } =
    useCalendarSelection({
      list: filteredList ?? schedulesList,
    });

  const hasFiltersActive = useMemo(
    () => Boolean(filtersActiveCount),
    [filtersActiveCount],
  );

  const shouldShowFilterEmptyState = useMemo(
    () => Boolean(hasFiltersActive && !filteredList),
    [hasFiltersActive, filteredList],
  );

  return (
    <HomeScreenPageContainer>
      <HeaderRow
        paddingHorizontal={24}
        paddingVertical={20}
        alignItems="center"
        justifyContent="space-between"
        mb={24}>
        {isOpen ? (
          <SchedulesCalendar appointmentsDates={calendarDates} />
        ) : (
          <>
            <Button
              variant="text"
              iconOrientation="left"
              icon="calendar_month"
              iconSize={20}
              onPress={handleCalendarOpen}>
              {capitalize(selectedMonth)}
            </Button>
            <FilterIconWrapper
              onPress={() => {
                navigation.navigate('Filters');
              }}>
              {isFilterLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Icon
                    name="filter_list"
                    size={24}
                    color={
                      hasFiltersActive
                        ? theme.colors.brand
                        : theme.colors.gray[700]
                    }
                  />
                  <FilterIconCountIndicator active={hasFiltersActive}>
                    {Boolean(hasFiltersActive) && (
                      <Typography color={colors.neutral.white}>
                        {filtersActiveCount}
                      </Typography>
                    )}
                  </FilterIconCountIndicator>
                </>
              )}
            </FilterIconWrapper>
          </>
        )}
      </HeaderRow>
      <LayoutContainer>
        {shouldShowFilterEmptyState ? (
          <ListEmptyState
            message="Nenhum resultado encontrado."
            buttonLabel="Limpar filtros"
            buttonIcon="delete"
          />
        ) : (
          <FlatList
            onScrollToIndexFailed={() => {}}
            initialScrollIndex={scheduleIndex}
            ref={scheduleListRef}
            data={hasFiltersActive ? filteredList : schedulesList}
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
        )}
      </LayoutContainer>
      <TouchableWithoutFeedback>
        <Shadow dp="dp06">
          <FloatingActionButton>
            <FloatingActionButtonItem
              onPress={() => Alert.alert('Pressed 1!')}
              label="Nova agenda"
              icon="menu_book"
            />
            <FloatingActionButtonItem
              onPress={() => Alert.alert('Pressed 2!')}
              label="Nova tarefa"
              icon="schedule"
            />
          </FloatingActionButton>
        </Shadow>
      </TouchableWithoutFeedback>
    </HomeScreenPageContainer>
  );
};

const HomeScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
`;

const FilterIconWrapper = styled.TouchableOpacity`
  position: relative;
`;

const FilterIconCountIndicator = styled.View<{ active?: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand : 'transparent'};
  position: absolute;
  right: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  align-items: center;
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
`;

const AcordionListWrapper = styled.View<{ isLast?: boolean }>`
  margin-bottom: ${({ isLast }) => (isLast ? '0px' : '16px')};
`;
