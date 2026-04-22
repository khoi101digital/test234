import React, { ReactElement, useEffect } from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import { useThemeColors } from '../../context/ThemeContext';
import ASLoadingIndicator from '../ASLoadingIndicator';
import { ArrowForwardIcon } from '../../assets/icon/arrow-forward.icon';
import { toNumber, getPlatformShadowStyle } from '../../utils/common.utils';

export type ASSwipeButtonProps = {
  containerStyles?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  disableResetOnTap?: boolean;
  disabledRailBackgroundColor?: string;
  disabledThumbIconBackgroundColor?: string;
  disabledThumbIconBorderColor?: string;
  enableReverseSwipe?: boolean;
  forceReset?: (reset: () => void) => void;
  height?: number | string;
  onSwipeFail?: () => void;
  onSwipeStart?: () => void;
  onPress?: () => void;
  railBackgroundColor?: string;
  railBorderColor?: string;
  railFillBackgroundColor?: string;
  railFillBorderColor?: string;
  railStyles?: ViewStyle | ViewStyle[];
  resetAfterSuccessAnimDelay?: number;
  resetAfterSuccessAnimDuration?: number;
  screenReaderEnabled?: boolean;
  shouldResetAfterSuccess?: boolean;
  swipeSuccessThreshold?: number;
  thumbIconBackgroundColor?: string;
  thumbIconBorderColor?: string;
  thumbIconComponent?: React.ReactElement;
  thumbIconImageSource?: ImageSourcePropType;
  thumbIconStyles?: ViewStyle | ViewStyle[];
  thumbIconWidth?: number;
  label?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleMaxFontScale?: number;
  labelStyles?: TextStyle | TextStyle[];
  width?: number | string;
  accessibilityLabel?: string;
  loading?: boolean;
  id?: string;
  testId?: string;
};

const ASSwipeButton: React.FC<ASSwipeButtonProps> = (props) => {
  const colors = useThemeColors();
  const {
    containerStyles,
    disabled,
    disableResetOnTap,
    disabledRailBackgroundColor,
    disabledThumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    enableReverseSwipe,
    forceReset,
    height,
    onSwipeFail,
    onSwipeStart,
    onPress,
    railBackgroundColor,
    railBorderColor,
    railFillBackgroundColor,
    railFillBorderColor,
    railStyles,
    resetAfterSuccessAnimDelay,
    resetAfterSuccessAnimDuration,
    screenReaderEnabled,
    shouldResetAfterSuccess,
    swipeSuccessThreshold,
    thumbIconBackgroundColor,
    thumbIconBorderColor,
    thumbIconComponent,
    thumbIconImageSource,
    thumbIconStyles,
    thumbIconWidth,
    label,
    titleColor,
    titleFontSize,
    titleMaxFontScale,
    labelStyles,
    width,
    accessibilityLabel,
    loading,
    id,
    testId = 'ASSwipeButton',
  } = props;

  const onSwipeSuccess = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };

  const renderThumbIcon = (): ReactElement => {
    return (
      <View>
        {loading ? (
          <ASLoadingIndicator loading={loading} />
        ) : thumbIconComponent ? (
          thumbIconComponent
        ) : (
          <ArrowForwardIcon color={railBackgroundColor} />
        )}
      </View>
    );
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        if (typeof document !== 'undefined' && document) {
          const swipeIcon = document.getElementById('swipe-icon');
          if (swipeIcon) {
            swipeIcon.addEventListener('mouseup', (event) => {
              const currentMouse = event.clientX;
              const width =
                document.getElementById('swipe-background')?.clientWidth;
              if (width && currentMouse + 10 > width) {
                if (onPress && typeof onPress === 'function') {
                  onPress();
                }
              }
            });
          }
        }
      }, 1500);
    } catch (error) {}
  }, []);

  // Helper function to flatten styles or return empty object if undefined
  const flattenStyles = (
    styles: ViewStyle | ViewStyle[] | TextStyle | TextStyle[] | undefined,
  ) => (styles ? StyleSheet.flatten(styles) : {});

  // Get platform-specific shadow style for container and thumb
  const flattenedContainerStyles = flattenStyles(containerStyles);
  const flattenedThumbIconStyles = flattenStyles(thumbIconStyles);
  const containerShadowStyle = getPlatformShadowStyle(flattenedContainerStyles);
  const thumbShadowStyle = getPlatformShadowStyle(flattenedThumbIconStyles);

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      id={id}
      testID={`view-${testId}`}
    >
      <SwipeButton
        {...({ testID: `swipeButton-${testId}` } as Record<'testID', string>)}
        containerStyles={{
          ...flattenedContainerStyles,
          ...containerShadowStyle,
        }}
        disabled={disabled}
        disableResetOnTap={disableResetOnTap}
        disabledRailBackgroundColor={disabledRailBackgroundColor}
        disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
        disabledThumbIconBorderColor={disabledThumbIconBorderColor}
        enableReverseSwipe={enableReverseSwipe}
        forceReset={forceReset}
        height={toNumber(height)}
        onSwipeFail={onSwipeFail}
        onSwipeStart={onSwipeStart}
        onSwipeSuccess={onSwipeSuccess}
        railBackgroundColor={railBackgroundColor}
        railBorderColor={railBorderColor}
        railFillBackgroundColor={railFillBackgroundColor}
        railFillBorderColor={railFillBorderColor}
        railStyles={flattenStyles(railStyles)}
        resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
        resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
        screenReaderEnabled={screenReaderEnabled}
        shouldResetAfterSuccess={shouldResetAfterSuccess}
        swipeSuccessThreshold={swipeSuccessThreshold}
        thumbIconBackgroundColor={thumbIconBackgroundColor}
        thumbIconBorderColor={thumbIconBorderColor}
        // @ts-ignore
        thumbIconComponent={renderThumbIcon}
        thumbIconImageSource={thumbIconImageSource}
        thumbIconStyles={{ ...flattenedThumbIconStyles, ...thumbShadowStyle }}
        thumbIconWidth={thumbIconWidth}
        title={label}
        titleMaxFontScale={titleMaxFontScale}
        titleStyles={flattenStyles(labelStyles)}
        width={toNumber(width)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    borderRadius: 5,
  },
  railStyles: {
    borderRadius: 5,
  },
  thumbIconStyles: {
    borderRadius: 5,
  },
  titleStyles: {
    fontSize: 16,
  },
});

export default ASSwipeButton;
