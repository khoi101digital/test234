import { Dimensions, DimensionValue, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const convertPercentageToPx = (
  percentage: number | string | DimensionValue | undefined,
  isWidth: boolean,
) => {
  if (!percentage) {
    return undefined;
  }

  if (typeof percentage === 'number') {
    return percentage;
  }

  if (typeof percentage === 'string') {
    percentage?.replace('%', '');
    return (
      (parseInt(percentage, 10) / 100) * (isWidth ? screenWidth : screenHeight)
    );
  }
};

const isAndroid = Platform.OS === 'android';

// Handle multiple loading. If any of the workflow loading is true => Show loading
const getLoadingStatus = (
  loading: boolean | boolean[] | undefined,
): boolean => {
  if (!loading) return false;
  return loading && Array.isArray(loading)
    ? loading.some((item: boolean) => item)
    : loading;
};

const hexToRgbaWithOpacity = (
  hex: string | undefined,
  opacity: number = 0.2,
): string => {
  if (!hex) return '#fff';
  // Remove the hash (#) if present
  hex = hex.replace(/^#/, '');
  // Handle shorthand hex (#RGB) by expanding it to full length (#RRGGBB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  // Parse the R, G, B values from the hex string
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const toNumber = (value: unknown): number =>
  typeof value === 'number' ? value : parseFloat(value as string) || 0;

const useIsTimeoutLoading = (
  timeout: number = 40000,
  loading: boolean | undefined,
) => {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    setIsTimeout(false);
    let _timeout: ReturnType<typeof setTimeout> | undefined;

    // Only start timeout when it's start loading
    if (loading) {
      _timeout = setTimeout(() => {
        setIsTimeout(true);
      }, timeout);
    }

    return () => {
      _timeout && clearTimeout(_timeout);
    };
  }, [timeout, loading]);

  return isTimeout;
};

export const parseColorToRgba = (color: string, opacity: number): string => {
  const cleanOpacityValue = opacity >= 1 ? 1 : opacity;

  // If already rgb()/rgba(), parse channels directly and combine alphas.
  const rgbMatch = color
    .trim()
    .match(
      /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i,
    );
  if (rgbMatch) {
    const [, rStr, gStr, bStr, aStr] = rgbMatch;
    const existingAlpha = aStr !== undefined ? Number(aStr) : 1;
    const combined = +(existingAlpha * cleanOpacityValue).toFixed(3);
    return `rgba(${Number(rStr)}, ${Number(gStr)}, ${Number(bStr)}, ${combined})`;
  }

  // Strip '#' and trim
  let hex = color.trim().replace(/^#/, '');

  // Expand shorthand (3 digits) to full form
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // If 8-digit hex, parse alpha and compute combined opacity
  let finalOpacity = cleanOpacityValue;

  if (hex.length === 8) {
    // Extract RGBA components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const aHex = parseInt(hex.slice(6, 8), 16) / 255;
    finalOpacity = +(aHex * cleanOpacityValue).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
  }

  // Normalize to 6-digit hex otherwise
  if (hex.length !== 6) {
    hex = hex.length < 6 ? hex.padEnd(6, '0') : hex.slice(0, 6);
  }

  // Parse RGB values
  const intVal = parseInt(hex, 16);
  const r = (intVal >> 16) & 0xff;
  const g = (intVal >> 8) & 0xff;
  const b = intVal & 0xff;

  return `rgba(${r}, ${g}, ${b}, ${+finalOpacity.toFixed(3)})`;
};
interface ShadowStyleInput {
  shadowColor?: string;
  shadowRadius?: number;
  shadowOpacity?: number;
  shadowOffset?: { width?: number; height?: number };
  shadowSpread?: number;
}

const getPlatformShadowStyle = (
  flattenedStyle: ShadowStyleInput | null | undefined,
) => {
  if (!flattenedStyle) return {};
  // Only apply shadow if at least one shadow property is explicitly set.
  // Without this guard, defaults (shadowOpacity=1, shadowColor=#000) cause a
  // visible border-like outline on iOS for every view with borderRadius.
  const hasShadow =
    flattenedStyle.shadowColor !== undefined ||
    flattenedStyle.shadowRadius !== undefined ||
    flattenedStyle.shadowOpacity !== undefined ||
    flattenedStyle.shadowOffset !== undefined ||
    flattenedStyle.shadowSpread !== undefined;
  if (!hasShadow) return {};
  const shadowRadiusDefault = flattenedStyle.shadowRadius || 0;
  const shadowOpacityDefault = flattenedStyle.shadowOpacity || 1;
  const shadowOffsetDefault = {
    width: Number(flattenedStyle.shadowOffset?.width || 0),
    height: Number(flattenedStyle.shadowOffset?.height || 0),
  };
  const shadowSpreadDefault = flattenedStyle.shadowSpread || 0;
  const shadowColorDefault = flattenedStyle.shadowColor || '#000000';

  const cleanOptions = {
    shadowRadius: Number(shadowRadiusDefault),
    shadowOpacity: Number(shadowOpacityDefault),
    shadowSpread: Number(shadowSpreadDefault),
    shadowColor: String(shadowColorDefault),
    shadowOffset: shadowOffsetDefault,
  };

  const {
    shadowRadius,
    shadowOpacity,
    shadowColor,
    shadowOffset,
    shadowSpread,
  } = cleanOptions;

  const rgba = parseColorToRgba(shadowColor, shadowOpacity / 1);

  if (Platform.OS === 'web') {
    return {
      boxShadow: `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius}px ${shadowSpread}px ${rgba}`,
    };
  }

  if (Platform.OS === 'ios') {
    const iosStyle: {
      shadowColor?: string;
      shadowOffset?: { width: number; height: number };
      shadowRadius?: number;
      shadowOpacity: number;
    } = { shadowOpacity: 1 };

    if (rgba) iosStyle.shadowColor = rgba;
    if (shadowOffset) iosStyle.shadowOffset = shadowOffset;
    if (shadowRadius !== undefined) iosStyle.shadowRadius = shadowRadius;

    return iosStyle;
  }

  // Convert iOS shadow properties to Android elevation
  if (Platform.OS === 'android') {
    let estimatedElevation = 0;

    // Calculate elevation from shadow properties
    if (shadowRadius !== undefined) {
      estimatedElevation = shadowRadius / 0.67;
    } else if (shadowOffset?.height) {
      estimatedElevation = shadowOffset.height / 0.5;
    }

    const calculatedElevation = Math.round(estimatedElevation);

    return calculatedElevation > 0 ? { elevation: calculatedElevation } : {};
  }

  return {};
};

const resolveEffectShadowToken = (
  effectToken: {
    blur?: number;
    color?: string;
    spread?: number;
    xOffset?: number;
    yOffset?: number;
  },
  overrides?: Partial<{
    blur: number;
    color: string;
    spread: number;
    xOffset: number;
    yOffset: number;
  }>,
) => {
  const merged = { ...effectToken, ...overrides };
  return getPlatformShadowStyle({
    shadowColor: merged.color || '#000000',
    shadowRadius: merged.blur || 0,
    shadowOffset: {
      width: merged.xOffset || 0,
      height: merged.yOffset || 0,
    },
    shadowSpread: merged.spread || 0,
    shadowOpacity: 1,
  });
};

export {
  screenWidth,
  screenHeight,
  convertPercentageToPx,
  isAndroid,
  getLoadingStatus,
  hexToRgbaWithOpacity,
  toNumber,
  useIsTimeoutLoading,
  getPlatformShadowStyle,
  resolveEffectShadowToken,
};
