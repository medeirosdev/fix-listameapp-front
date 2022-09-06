import { atom } from 'jotai';
import { SelectDateBottomShetTypes } from '~/modules/home/components/SelectDateBottomSheet';
import { IAgenda } from '~/modules/schedule/types/agendas';

export type AgendaFilterDateRange = {
  start?: {
    value?: string;
    label?: string;
  };
  end?: {
    value?: string;
    label?: string;
  };
} | null;

export type AgendaFilterChecked = Record<IAgenda['id'], boolean> | null;

export const isFilteringAtom = atom(false);
export const agendaDatesFilterAtom = atom<AgendaFilterDateRange>(null);
export const bottomSheetOpenTypeAtom = atom<SelectDateBottomShetTypes | null>(
  null,
);
export const agendaCheckedFilterAtom = atom<AgendaFilterChecked>(null);
export const agendaSelectedFiltersCountAtom = atom((get) => {
  let count = 0;
  const checkedAgendas = get(agendaCheckedFilterAtom);
  if (checkedAgendas && Object.values(checkedAgendas).some(Boolean)) count++;
  if (get(agendaDatesFilterAtom) !== null) count++;
  return count;
});

export const agendasCheckedIdsAtom = atom((get) => {
  const checkedAgendas = get(agendaCheckedFilterAtom);
  if (checkedAgendas)
    return Object.keys(checkedAgendas).filter((key) => checkedAgendas[key]);
  return [];
});
