import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PrivateParamList = {
  Home: undefined;
  Schedules: undefined;
};

export type PrivateScreensNames = keyof PrivateParamList;
export type PrivateRouterParamList<T extends PrivateScreensNames> = RouteProp<
  PrivateParamList,
  T
>;

export type PrivateNavigation = NativeStackNavigationProp<PrivateParamList>;
export type PrivateNavigationParams = NavigationProp<PrivateParamList>;
