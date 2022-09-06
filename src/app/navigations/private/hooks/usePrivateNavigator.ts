import { useNavigation } from '@react-navigation/native';
import { PrivateNavigation } from '~/app/navigations/private/types';

export const usePrivateNavigation = useNavigation<PrivateNavigation>;
