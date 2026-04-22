import React, {
  ReactNode,
  useState,
  isValidElement,
  Children,
  cloneElement,
} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { getPlatformShadowStyle } from '../../utils/common.utils';
import ASImage from '../ASImage';

import LinearGradient from 'react-native-linear-gradient';

export type ASColumnProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundImage?: string;
  accessibilityLabel?: string;
  spacing?: number;
  testId?: string;
  scrollable?: boolean;
  scrollDirection?: string;
};

const ASColumn: React.FC<ASColumnProps> = (props: ASColumnProps) => {
  const {
    children,
    style,
    backgroundImage,
    accessibilityLabel,
    spacing = 0,
    testId = 'ASColumn',
    scrollable,
    scrollDirection,
    ...restProps
  } = props;
  const [containerHeight, setContainerHeight] = useState(0); // State to hold container height
  const flexValue =
    Array.isArray(children) && children.length > 0
      ? children.reduce(
          (
            acc: number | undefined,
            child: React.ReactElement<{ style?: StyleProp<ViewStyle> }>,
          ) => {
            if (!child || !child.props || !child.props.style) return acc; // Ensure child and its props exist
            const { flex } = StyleSheet.flatten(child.props.style);
            if (flex !== undefined && flex !== 0) return flex; // Return the first non-zero flex value found
            return acc; // Keep the previous value if none found
          },
          undefined,
        )
      : undefined;

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

  // Check if this column should be scrollable
  const isScrollable =
    scrollable === true || flattenedStyle?.overflow === 'scroll';

  // Extract overflow property to apply later (to override default 'visible')
  const overflowStyle = flattenedStyle?.overflow
    ? { overflow: flattenedStyle.overflow }
    : {};

  // Extract border radius properties to apply to background image
  const borderRadiusStyle: ViewStyle = {};
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
  // Also convert height: '100%' to flex: 1 for consistent behavior between CSS flex and Yoga
  const wrappedChildren = Children.map(children, (child) => {
    if (
      isValidElement<{ style?: StyleProp<ViewStyle> }>(child) &&
      !!child.props?.style
    ) {
      const childStyle = StyleSheet.flatten(child.props?.style);
      const overrideStyle: ViewStyle = isScrollable
        ? { flexShrink: 0 }
        : { minWidth: 0, minHeight: 0 };
      if (!isScrollable && childStyle?.height === '100%') {
        overrideStyle.flex = 1;
        overrideStyle.height = undefined;
      }
      return cloneElement(
        child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>,
        {
          style: [child.props?.style, overrideStyle],
        },
      );
    }
    return child;
  });

  return (
    <View
      testID={`view-${testId}`}
      style={[
        styles.container,
        { ...(flexValue && { flex: flexValue }) },
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
          resizeMode='cover' // Cover the entire area, maintaining aspect ratio
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
          horizontal={scrollDirection === 'horizontal'}
          style={{ width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexGrow: 1,
            ...(scrollDirection === 'horizontal'
              ? { flexDirection: 'row' }
              : {}),
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
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'visible',
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

export default ASColumn;
