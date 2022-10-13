import React, { FC, useMemo, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { Row } from '~/app/components/Row';
import { Icon } from '~/app/components/Icon';
import { SelectOption } from '~/app/components/Form/types';

interface IAppointmentNotificationBottomSheetProps {
  onClose?: (...args: unknown[]) => void;
  options: SelectOption[];
  onSelect: (option: SelectOption) => void;
}

export const AppointmentNotificationBottomSheet: FC<
  IAppointmentNotificationBottomSheetProps
> = ({ onClose, options = [], onSelect }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [options.length ? '45%' : '20%', '65%'], []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 2,
        ...theme.shadows.dp24,
        shadowColor: '#000',
        padding: 24,
      },
      background: {
        borderRadius: theme.radii.xxl,
        elevation: theme.elevations.dp24,
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
      <ContentContainerView
        contentContainerStyle={{
          paddingVertical: 16,
          display: 'flex',
          alignItems: 'center',
        }}>
        {options?.length ? (
          options?.map((option) => (
            <OptionButton
              key={String(option?.value)}
              onPress={() => onSelect(option)}>
              <Option my={4}>
                <OptionText>{option?.label}</OptionText>
              </Option>
            </OptionButton>
          ))
        ) : (
          <OptionText>Nenhum opção disponível...</OptionText>
        )}
      </ContentContainerView>
      <CloseIcon onPress={onClose} />
    </BottomSheet>
  );
};

const ContentContainerView = styled.ScrollView`
  flex: 0.5;
`;

const Option = styled(Row)`
  padding: 16px;
  align-items: center;
`;

const OptionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  margin-left: 12px;
`;

const OptionButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  activeOpacity: 0.8,
  underlayColor: theme.colors.primary.blue[50],
}))`
  border-radius: 8px;
`;

const CloseIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'add',
  size: 24,
  color: theme.colors.task.red,
}))`
  align-self: flex-end;
  position: absolute;
  transform: rotate(45deg);
`;
