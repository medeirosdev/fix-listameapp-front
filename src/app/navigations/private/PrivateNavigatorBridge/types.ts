import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type PrivateBridgeParamList = {
  Drawer: undefined;
  Filters: undefined;
};

export type PrivateBridgeScreensNames = keyof PrivateBridgeParamList;
export type PrivateBridgeRouterParamList<T extends PrivateBridgeScreensNames> =
  RouteProp<PrivateBridgeParamList, T>;

export type PrivateBridgeNavigation =
  NativeStackNavigationProp<PrivateBridgeParamList>;
export type PrivateBridgeNavigationParams =
  NavigationProp<PrivateBridgeParamList>;
export type PrivateBridgeNavigationScreenProps =
  NativeStackScreenProps<PrivateBridgeParamList>;
