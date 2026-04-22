import React, { useContext, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Platform,
  ViewStyle,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';
import { useField } from 'formik';
import { ThemeContext } from '../../context/ThemeContext';
import { getPlatformShadowStyle } from '../../utils/common.utils';

// Types
type SliderTop = ViewStyle['top'];
type SliderWidth = ViewStyle['width'];
type SliderHeight = ViewStyle['height'];
type SliderNativeTransform = ViewStyle['transform'];
type SliderTransform = SliderNativeTransform | React.CSSProperties['transform'];

export type SliderTrackStyles = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  position?: 'absolute' | 'relative';
  transform?: SliderTransform;
  top?: number | string;
};

export type SliderThumbStyles = {
  size?: number;
  borderRadius?: number;
  backgroundColor?: string;
  position?: 'absolute' | 'relative';
  transform?: SliderTransform;
  top?: number | string;
};

export type ASSliderProps = {
  onChange?: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  name: string;
  step?: number;
  testId?: string;
  sliderTrackStyles?: SliderTrackStyles;
  sliderThumbStyles?: SliderThumbStyles;
  style?: ViewStyle;
  disabled?: boolean;
};

// Default values
const DEFAULT_TRACK_HEIGHT = 6;
const DEFAULT_TRACK_BORDER_RADIUS = 3;
const DEFAULT_THUMB_SIZE = 20;

const ASSlider: React.FC<ASSliderProps> = ({
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  name,
  onChange,
  testId = 'ASSlider',
  sliderTrackStyles,
  sliderThumbStyles,
  style,
  disabled = false,
}) => {
  const { colors } = useContext(ThemeContext);
  const [field, , helpers] = useField(name);
  const platformShadowStyle = getPlatformShadowStyle(sliderTrackStyles);

  const { setValue } = helpers || {};

  const trackWidthRef = useRef(0);
  const trackPageXRef = useRef(0);

  // Parse slider value
  const sliderValue = isNaN(parseFloat(field?.value))
    ? minimumValue
    : parseFloat(field?.value);

  // Extract track styles with defaults
  const trackWidth = sliderTrackStyles?.width ?? '100%';
  const trackHeight = sliderTrackStyles?.height ?? DEFAULT_TRACK_HEIGHT;
  const trackBorderRadius =
    sliderTrackStyles?.borderRadius ?? DEFAULT_TRACK_BORDER_RADIUS;
  const activeTrackColor = sliderTrackStyles?.activeBackgroundColor;
  const inactiveTrackColor = sliderTrackStyles?.inactiveBackgroundColor;
  const trackPosition = sliderTrackStyles?.position;
  const trackTransform = sliderTrackStyles?.transform;
  const trackTop = sliderTrackStyles?.top;

  // Extract thumb styles with defaults
  const thumbSize = sliderThumbStyles?.size ?? DEFAULT_THUMB_SIZE;
  const thumbBorderRadius = sliderThumbStyles?.borderRadius ?? thumbSize / 2;
  const thumbBackgroundColor = sliderThumbStyles?.backgroundColor;
  const thumbPosition = sliderThumbStyles?.position;
  const thumbTransform = sliderThumbStyles?.transform;
  const thumbTop = sliderThumbStyles?.top;

  // Calculate percentage from value
  const calculatePercentage = (value: number): number => {
    if (maximumValue === minimumValue) return 0;
    const percentage =
      ((value - minimumValue) / (maximumValue - minimumValue)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  // Calculate value from position
  const calculateValue = useCallback(
    (positionX: number): number => {
      if (trackWidthRef.current === 0) return minimumValue;
      const percentage = Math.max(
        0,
        Math.min(1, positionX / trackWidthRef.current),
      );
      let value = minimumValue + percentage * (maximumValue - minimumValue);
      if (step > 0) {
        value = Math.round(value / step) * step;
      }
      return Math.max(minimumValue, Math.min(maximumValue, value));
    },
    [minimumValue, maximumValue, step],
  );

  // Handle value change
  const handleValueChange = useCallback(
    (value: number) => {
      setValue?.(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );

  // Use refs to avoid stale closures in PanResponder
  const calculateValueRef = useRef(calculateValue);
  const handleValueChangeRef = useRef(handleValueChange);
  useEffect(() => {
    calculateValueRef.current = calculateValue;
    handleValueChangeRef.current = handleValueChange;
  }, [calculateValue, handleValueChange]);

  const percentValue = calculatePercentage(sliderValue);

  // Handle track layout to get width and position
  const onTrackLayout = (event: LayoutChangeEvent) => {
    trackWidthRef.current = event.nativeEvent.layout.width;
  };

  // PanResponder for drag handling (native only)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        // Store track's page position and use locationX for initial tap
        trackPageXRef.current =
          evt.nativeEvent.pageX - evt.nativeEvent.locationX;
        const newValue = calculateValueRef.current(evt.nativeEvent.locationX);
        handleValueChangeRef.current(newValue);
      },
      onPanResponderMove: (_evt, gestureState) => {
        // Use moveX (absolute screen position) minus track's left offset
        // This avoids the locationX issue on Android where it reports
        // coordinates relative to whichever child view the finger is over
        const positionX = gestureState.moveX - trackPageXRef.current;
        const newValue = calculateValueRef.current(positionX);
        handleValueChangeRef.current(newValue);
      },
    }),
  ).current;

  // Web-specific slider component
  if (Platform.OS === 'web') {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const updateValueFromClientX = useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        let value = minimumValue + percentage * (maximumValue - minimumValue);
        if (step > 0) {
          value = Math.round(value / step) * step;
        }
        value = Math.max(minimumValue, Math.min(maximumValue, value));
        handleValueChange(value);
      },
      [disabled, minimumValue, maximumValue, step],
    );

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return;
        e.preventDefault();
        updateValueFromClientX(e.clientX);
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [updateValueFromClientX]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      isDraggingRef.current = true;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'pointer';
      updateValueFromClientX(e.clientX);
    };

    // Web styles
    const webTrackStyle: React.CSSProperties = {
      position: 'relative',
      width: trackWidth,
      height: trackHeight,
      borderRadius: trackBorderRadius,
      backgroundColor: inactiveTrackColor,
      cursor: disabled ? 'default' : 'pointer',
      ...(trackPosition && { position: trackPosition }),
      ...(trackTop !== undefined && { top: trackTop }),
      ...(trackTransform && {
        transform: trackTransform as React.CSSProperties['transform'],
      }),
    };

    const webActiveTrackStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: `${percentValue}%`,
      borderRadius: trackBorderRadius,
      backgroundColor: activeTrackColor,
      pointerEvents: 'none',
    };

    const webThumbStyle: React.CSSProperties = {
      position: 'absolute',
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbBorderRadius,
      backgroundColor: thumbBackgroundColor,
      top: '50%',
      left: `${percentValue}%`,
      transform: 'translate(-50%, -50%)',
      cursor: disabled ? 'default' : 'grab',
      boxShadow: '0 0 2px rgba(0,0,0,0.3)',
      pointerEvents: 'none',
    };

    return (
      <View
        testID={testId}
        style={[style, { minHeight: webThumbStyle?.height }]}
      >
        <div
          ref={trackRef}
          data-testid={`track-${testId}`}
          style={{ ...webTrackStyle, ...platformShadowStyle }}
          onMouseDown={handleMouseDown}
        >
          <div style={webActiveTrackStyle} />
          <div data-testid={`thumb-${testId}`} style={webThumbStyle} />
        </div>
      </View>
    );
  }

  // Native styles
  const nativeTrackContainerStyle: ViewStyle = {
    position: 'relative',
    width: trackWidth as SliderWidth,
    height: trackHeight as SliderHeight,
    justifyContent: 'center',
    ...(trackPosition && { position: trackPosition }),
    ...(trackTop !== undefined && { top: trackTop as SliderTop }),
    ...(trackTransform && {
      transform: trackTransform as SliderNativeTransform,
    }),
  };

  const nativeInactiveTrackStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: trackHeight as SliderHeight,
    borderRadius: trackBorderRadius,
    backgroundColor: inactiveTrackColor,
  };

  const nativeActiveTrackStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    width: `${percentValue}%` as SliderWidth,
    height: trackHeight as SliderHeight,
    borderRadius: trackBorderRadius,
    backgroundColor: activeTrackColor,
  };

  const nativeThumbStyle: ViewStyle = {
    position: 'absolute',
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbBorderRadius,
    backgroundColor: thumbBackgroundColor,
    left: `${percentValue}%` as ViewStyle['left'],
    top: '50%',
    transform: [{ translateX: -thumbSize / 2 }, { translateY: -thumbSize / 2 }],
    ...(thumbPosition && { position: thumbPosition }),
    ...(thumbTop !== undefined && { top: thumbTop as SliderTop }),
    ...(thumbTransform && {
      transform: thumbTransform as SliderNativeTransform,
    }),
  };

  return (
    <View testID={testId} style={[style, { minHeight: thumbSize }]}>
      <View
        testID={`track-container-${testId}`}
        style={nativeTrackContainerStyle}
        onLayout={onTrackLayout}
        {...panResponder.panHandlers}
      >
        <View
          testID={`inactive-track-${testId}`}
          style={{ ...nativeInactiveTrackStyle, ...platformShadowStyle }}
        />
        <View
          testID={`active-track-${testId}`}
          style={nativeActiveTrackStyle}
        />
        <View testID={`thumb-${testId}`} style={nativeThumbStyle} />
      </View>
    </View>
  );
};

export default ASSlider;
