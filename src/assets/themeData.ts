import { createThemeData } from '../context';

import { component } from './component';

import { color } from './color';

import { space } from './space';

import { radius } from './radius';

import { border } from './border';

import { typography } from './typography';

import { text } from './text';

import { effect } from './effect';

const themeData = createThemeData({
  component: component,

  color: color,

  space: space,

  radius: radius,

  border: border,

  typography: typography,

  text: text,

  effect: effect,
});

export default themeData;
