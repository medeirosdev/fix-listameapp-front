import { useAtom } from 'jotai';
import { DateData } from 'react-native-calendars';
import {
  OnEndDateChange,
  OnStartDateChange,
} from '~/modules/home/components/SelectDateBottomSheet';
import {
  agendaDatesFilterAtom,
  bottomSheetOpenTypeAtom,
} from '~/modules/home/state/atoms/agendaFilterAtoms';
import { padDatePart } from '~/modules/home/utils/formatDateObject';

export const useFilterByDate = () => {
  const [filterDateRange, setFilterDateRange] = useAtom(agendaDatesFilterAtom);
  const [bottomSheetOpenType, setBottomSheetOpenType] = useAtom(
    bottomSheetOpenTypeAtom,
  );

  const onStartDateChange: OnStartDateChange = (startDate) => {
    setFilterDateRange((prev) => ({
      start: {
        value: startDate.dateString,
        label: formatDate(startDate),
      },
      end: prev?.end,
    }));
    setBottomSheetOpenType('end');
  };

  const onEndDateChange: OnEndDateChange = (endDate) => {
    setFilterDateRange((prev) => ({
      start: prev?.start,
      end: {
        value: endDate.dateString,
        label: formatDate(endDate),
      },
    }));
    setBottomSheetOpenType('start');
  };

  const formatDate = ({ year, month, day }: DateData) => {
    return `${padDatePart(day)}/${padDatePart(month)}/${year}`;
  };

  const resetDateFilter = () => {
    setFilterDateRange(null);
    setBottomSheetOpenType(null);
  };

  return {
    resetDateFilter,
    onStartDateChange,
    onEndDateChange,
    filterDateRange,
    bottomSheetOpenType,
    setBottomSheetOpenType,
  };
};
