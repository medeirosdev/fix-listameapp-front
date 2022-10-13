import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { Row } from '~/app/components/Row';
import { Icon } from '~/app/components/Icon';
import { Button } from '~/app/components/Button';
import {
  MutateFunction,
  UseMutateFunction,
  useMutation,
} from '@tanstack/react-query';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { loadUserProfilesThunk } from '~/modules/auth/state/thunks/userThunks';
import { IUser } from '~/modules/auth/types/user';
import { IAgenda } from '~/modules/schedule/types/agendas';

interface IEditAvatarBottomSheet<T extends IUser | IAgenda> {
  onClose?: (...args: unknown[]) => void;
  choosePhotoOnGalery: () => void;
  isLoading?: boolean;
  setPhoto: (photo: string) => void;
  takePhotoFromCamera?: () => void;
  deleteAvatar: () => void;
}

export const EditAvatarBottomSheet = <T extends IUser | IAgenda>({
  onClose,
  isLoading,
  choosePhotoOnGalery,
  takePhotoFromCamera,
  deleteAvatar,
}: IEditAvatarBottomSheet<T>) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '65%'], []);

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
      <ContentContainerView>
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <OptionButton onPress={() => deleteAvatar()}>
              <Option my={4}>
                <Icon color={theme.colors.brand} size={24} name="delete" />
                <OptionText>Remover foto atual</OptionText>
              </Option>
            </OptionButton>
            <OptionButton onPress={takePhotoFromCamera}>
              <Option my={4}>
                <Icon color={theme.colors.brand} size={24} name="image" />
                <OptionText>Fazer nova foto</OptionText>
              </Option>
            </OptionButton>
            <OptionButton onPress={choosePhotoOnGalery}>
              <Option my={4}>
                <Icon color={theme.colors.brand} size={24} name="image" />
                <OptionText>Escolher na Galeria</OptionText>
              </Option>
            </OptionButton>
            <Row mt={12}>
              <Button onPress={onClose} fullWidth>
                Cancelar
              </Button>
            </Row>
          </>
        )}
      </ContentContainerView>
    </BottomSheet>
  );
};

const ContentContainerView = styled.View``;

const Option = styled(Row)`
  padding: 16px;
  align-items: center;
`;

const OptionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  color: ${({ theme: { colors } }) => colors.brand};
  margin-left: 12px;
`;

const OptionButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  activeOpacity: 0.8,
  underlayColor: theme.colors.primary.blue[50],
}))`
  border-radius: 8px;
`;

const Skeleton = styled(Row)`
  height: 60px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: ${({ theme: { colors } }) => colors.neutral.blackAlpha};
`;
