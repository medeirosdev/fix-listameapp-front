import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { isUser, IUser } from '~/modules/auth/types/user';
import { IAgenda, isAgenda } from '~/modules/schedule/types/agendas';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { IUploadAvatarRequest } from '~/modules/profile/types/upload';
import { loadUserProfilesThunk } from '~/modules/auth/state/thunks/userThunks';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';

interface IUseAvatarUploadProps<T> {
  uploadApiCallback?: IUploadAvatarRequest<T>;
}

export const useAvatarUpload = <T = IUser | IAgenda>({
  uploadApiCallback,
}: IUseAvatarUploadProps<T>) => {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState<string>('');
  const { mutate: uploadPhoto, isLoading } = useMutation({
    mutationFn: uploadApiCallback,
    onSuccess: handleSuccessUploadedPhoto,
  });

  const choosePhotoOnGalery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response && !response.errorCode) {
        uploadPhoto(response);
      }
    });
  };

  const takePhotoFromCamera = async () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response) {
        uploadPhoto(response);
      }
    });
  };

  async function handleSuccessUploadedPhoto(entity: T) {
    if (isUser(entity) || isAgenda(entity)) setPhoto(entity?.avatar_url || '');
    await dispatch(loadUserProfilesThunk());
  }

  return {
    photo,
    isLoading,
    choosePhotoOnGalery,
    takePhotoFromCamera,
    setPhoto,
  };
};
