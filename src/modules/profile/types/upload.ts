import { ImagePickerResponse } from 'react-native-image-picker';

export interface IUploadAvatarRequest<T> {
  (imagePickerData: ImagePickerResponse): Promise<T>;
}
