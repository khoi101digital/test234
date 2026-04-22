import React, {
  ReactNode,
  useState,
  isValidElement,
  Children,
  cloneElement,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { getPlatformShadowStyle } from '../../utils/common.utils';
import ASImage from '../ASImage';

import LinearGradient from 'react-native-linear-gradient';

export type ASRowProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  spacing?: number;
  testId?: string;
  backgroundImage?: string | number | { uri: string };
};

const ASRow: React.FC<ASRowProps> = (props: ASRowProps) => {
  const {
    children,
    style,
    accessibilityLabel,
    spacing,
    testId = 'ASRow',
    backgroundImage,
    scrollable,
    scrollDirection,
    ...restProps
  } = props || {};
  const [containerHeight, setContainerHeight] = useState(0); // State to hold container height

  // Get platform-specific shadow style from flattened style
  const flattenedStyle = StyleSheet.flatten(style) as ViewStyle &
    Record<string, unknown>;
  const platformShadowStyle = getPlatformShadowStyle(flattenedStyle);

  // Extract gradient properties from style
  const {
    gradientType: _gradientType,
    gradientColors: _gradientColors,
    gradientStops: _gradientStops,
    gradientStart: _gradientStart,
    gradientEnd: _gradientEnd,
    ...cleanFlattenedStyle
  } = flattenedStyle || {};
  const hasGradient =
    Array.isArray(_gradientColors) && _gradientColors.length >= 2;

  // Check if this row should be scrollable
  const isScrollable =
    scrollable === true || flattenedStyle?.overflow === 'scroll';

  // Extract overflow property to apply later (to override default 'visible')
  const overflowStyle = flattenedStyle?.overflow
    ? { overflow: flattenedStyle.overflow }
    : {};

  const borderRadiusStyle: {
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
  } = {};
  if (flattenedStyle?.borderRadius !== undefined)
    borderRadiusStyle.borderRadius = flattenedStyle.borderRadius;
  if (flattenedStyle?.borderTopLeftRadius !== undefined)
    borderRadiusStyle.borderTopLeftRadius = flattenedStyle.borderTopLeftRadius;
  if (flattenedStyle?.borderTopRightRadius !== undefined)
    borderRadiusStyle.borderTopRightRadius =
      flattenedStyle.borderTopRightRadius;
  if (flattenedStyle?.borderBottomLeftRadius !== undefined)
    borderRadiusStyle.borderBottomLeftRadius =
      flattenedStyle.borderBottomLeftRadius;
  if (flattenedStyle?.borderBottomRightRadius !== undefined)
    borderRadiusStyle.borderBottomRightRadius =
      flattenedStyle.borderBottomRightRadius;

  // Wrap children with layout overrides:
  // - Scrollable: flexShrink: 0 so children keep natural size for scrolling
  // - Non-scrollable: minWidth/minHeight: 0 to support proper flexbox shrinking
  const wrappedChildren = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      !!(child.props as { style?: StyleProp<ViewStyle> })?.style
    ) {
      const childStyle = StyleSheet.flatten(
        (child.props as { style?: StyleProp<ViewStyle> })?.style,
      );
      const overrideStyle: ViewStyle = isScrollable
        ? { flexShrink: 0 }
        : { minWidth: 0, minHeight: 0 };
      if (!isScrollable && childStyle?.width === '100%') {
        overrideStyle.flex = 1;
        overrideStyle.width = undefined;
      }
      return cloneElement(
        child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>,
        {
          style: [
            (child.props as { style?: StyleProp<ViewStyle> })?.style,
            overrideStyle,
          ],
        },
      );
    }
    return child;
  });

  return (
    <View
      testID={testId}
      style={[
        styles.container,
        style,
        platformShadowStyle,
        { ...(spacing && { gap: spacing }) },
        overflowStyle,
      ]}
      accessibilityLabel={accessibilityLabel}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout; // Get height after layout
        setContainerHeight(height); // Update state with the container height
      }}
      {...restProps}
    >
      {backgroundImage && (
        <ASImage
          testID={`${testId}-BackgroundImage`}
          source={backgroundImage}
          style={[styles.backgroundStyle, borderRadiusStyle]}
          resizeMode='cover'
        />
      )}
      {hasGradient && (
        <LinearGradient
          colors={_gradientColors}
          {...(_gradientStops ? { locations: _gradientStops } : {})}
          {...(_gradientStart ? { start: _gradientStart } : {})}
          {...(_gradientEnd ? { end: _gradientEnd } : {})}
          style={[StyleSheet.absoluteFillObject, borderRadiusStyle]}
        />
      )}
      {isScrollable ? (
        <ScrollView
          testID={`scrollView-${testId}`}
          horizontal={scrollDirection !== 'vertical'}
          style={{ width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexDirection: scrollDirection !== 'vertical' ? 'row' : 'column',
            ...(spacing ? { gap: spacing } : {}),
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {wrappedChildren}
        </ScrollView>
      ) : (
        wrappedChildren
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  backgroundStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%', // Fill the entire width of the parent
    height: '100%',
    zIndex: -1, // Ensure the background image is behind other elements
  },
});

export default ASRow;

// Note: ASRow Example
/*
                <ASRow>
                    <ASText style={{textAlign: 'center'}}>Welcome to App Studio</ASText>
                    <ASVerticalDivider/>
                    <ASText style={{color: 'red'}}>Testing component</ASText>
                </ASRow>
* */
