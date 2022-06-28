import { DefaultTheme } from 'styled-components/native';

import { colors } from './colors';
import { elevations } from './elevations';
import { fontSizes } from './fontSizes';
import { radii } from './radii';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme: DefaultTheme = {
  fontSizes,
  radii,
  typography,
  colors,
  elevations,
  shadows: shadows,
};
