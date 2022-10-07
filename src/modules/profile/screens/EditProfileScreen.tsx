import React, { FC, useState } from 'react';
import { UserAvatar } from '~/modules/home/components/UserAvatar';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import {
  currentUserSelector,
  isUserProfilesLoadingSelector,
} from '~/modules/auth/state/selectors/userSelectors';
import { AvatarHeaderLayout } from '~/app/components/AvatarHeaderLayout';
import { Typography } from '~/app/components/Typography';
import styled from 'styled-components/native';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { Icon } from '~/app/components/Icon';
import { Row } from '~/app/components/Row';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { profilesApi } from '~/modules/auth/services/api/profilesApi';
import { EditProfileBottomSheet } from '~/modules/profile/components/EditProfileBottomSheet';
import { useAvatarUpload } from '~/modules/profile/hooks/useAvatarUpload';
import { TouchableOpacity } from 'react-native';

export const EditProfileScreen: FC = () => {
  const navigation = usePrivateNavigation();
  const user = useAppSelector(currentUserSelector);
  const userProfilesLoading = useAppSelector(isUserProfilesLoadingSelector);
  const [bottonSheetOpen, setBottonSheetOpen] = useState(false);
  const isLoading = !user || userProfilesLoading;
  const {
    choosePhotoOnGalery,
    takePhotoFromCamera,
    photo,
    setPhoto,
    isLoading: isAvatarLoading,
  } = useAvatarUpload({
    uploadApiCallback: profilesApi.uploadAvatar,
  });

  const goToEditNameScreen = () => navigation.navigate('EditProfileName');
  const goToEditPassowrdScreen = () =>
    navigation.navigate('EditProfilePassword');

  return (
    <>
      <AvatarHeaderLayout
        avatar={
          <UserAvatar
            variant="large"
            hasUpload
            onUploadButtonClick={() => setBottonSheetOpen(true)}
            url={photo}
            isLoading={isAvatarLoading}
          />
        }>
        {isLoading ? (
          <ListEmptyState message="Carregando... " isLoading={isLoading} />
        ) : (
          <>
            <UserDataWrapper>
              <UserTextInfo fontGroup="h6Bold">{user?.name || ''}</UserTextInfo>
              <UserTextInfo fontGroup="bodySmallMedium">
                {user?.email || ''}
              </UserTextInfo>
            </UserDataWrapper>
            <TouchableOpacity activeOpacity={0.8} onPress={goToEditNameScreen}>
              <FooterEditSection my={16}>
                <FooterEditSectionText>Alterar nome</FooterEditSectionText>
                <Icon name="arrow_forward_ios" />
              </FooterEditSection>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToEditPassowrdScreen}>
              <FooterEditSection>
                <FooterEditSectionText>Alterar senha</FooterEditSectionText>
                <Icon name="arrow_forward_ios" />
              </FooterEditSection>
            </TouchableOpacity>
          </>
        )}
      </AvatarHeaderLayout>
      {bottonSheetOpen && (
        <EditProfileBottomSheet
          onClose={() => setBottonSheetOpen(false)}
          choosePhotoOnGalery={choosePhotoOnGalery}
          takePhotoFromCamera={takePhotoFromCamera}
          isAvatarLoading={isAvatarLoading}
          setPhoto={setPhoto}
        />
      )}
    </>
  );
};

export const UserTextInfo = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.primary.blue[700]};
  align-self: center;
`;

export const UserDataWrapper = styled.View`
  margin: 12px 0px;
`;

const FooterEditSection = styled(Row)`
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme: { colors } }) => colors.primary.blue[50]};
  border-radius: 8px;
`;

const FooterEditSectionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})``;
