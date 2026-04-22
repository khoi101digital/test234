import { color } from './color';
import { radius } from './radius';
import { space } from './space';

export const component = {
  input: {
    padding: {
      y: space['3'],
      x: space['3'],
    },
    radius: radius.sm,
    height: 44,
    border: {
      error: color.status.danger,
      default: color.border.default,
      disabled: color.border.disabled,
      focus: color.border.strong,
    },
    placeholder: color.text.tertiary,
    text: color.text.primary,
    background: color.surface.default,
  },
  icon: {
    size: {
      lg: 24,
      md: 20,
      sm: 16,
    },
  },
  button: {
    height: 44,
    text: {
      disabled: color.text.disabled,
      color: color.brand.onPrimary,
    },
    background: {
      disabled: color.surface.disabled,
      color: color.brand.primary,
    },
    radius: radius.md,
    border: color.border.default,
  },
  dropdown: {
    selectedText: {
      color: '#EAEAEA',
    },
  },
};
