import React, { ReactNode } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { toNumber } from '../../utils/common.utils';

import LinearGradient from 'react-native-linear-gradient';

type HeaderRoute = {
  name?: string;
  params?: {
    headerShown?: boolean;
  };
};

export type ASContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isScrollable?: boolean;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  disabledSafeArea?: boolean;
  isPreview?: boolean;
  testId?: string;
};

const ASContainer: React.FC<ASContainerProps> = (props: ASContainerProps) => {
  const {
    children,
    style,
    isScrollable,
    scrollViewContentContainerStyle,
    scrollViewProps,
    disabledSafeArea,
    isPreview = false,
    testId = 'ASContainer',
    ...restProps
  } = props;

  const insets = disabledSafeArea
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : useSafeAreaInsets();
  const navigation = isPreview ? false : useNavigation();
  const route = isPreview ? { name: false } : useRoute();

  // Check if the current screen has a header
  const hasHeader =
    !isPreview && navigation !== false && route.name !== false
      ? navigation
          .getParent()
          ?.getState()
          .routes.some(
            (r: HeaderRoute) =>
              r.name === route.name && r.params?.headerShown !== false,
          )
      : undefined;

  // Set hasHeader to false if it is undefined
  const isHeaderVisible = hasHeader === undefined ? true : false;

  const flattenedStyle = StyleSheet.flatten(style) as ViewStyle &
    Record<string, unknown>;

  // Extract gradient properties from style
  const {
    gradientType: _gradientType,
    gradientColors: _gradientColors,
    gradientStops: _gradientStops,
    gradientStart: _gradientStart,
    gradientEnd: _gradientEnd,
    ...cleanStyle
  } = flattenedStyle || {};
  const hasGradient =
    Array.isArray(_gradientColors) && _gradientColors.length >= 2;

  const safeAreaStyle = disabledSafeArea
    ? {}
    : {
        paddingTop: isHeaderVisible
          ? Math.max(toNumber(flattenedStyle?.paddingTop) ?? 0, insets.top, 0)
          : (toNumber(flattenedStyle?.paddingTop) ?? 0) + insets.top,
        paddingBottom:
          (toNumber(flattenedStyle?.paddingBottom) ?? 0) + insets.bottom,
        paddingLeft: (toNumber(flattenedStyle?.paddingLeft) ?? 0) + insets.left,
        paddingRight:
          (toNumber(flattenedStyle?.paddingRight) ?? 0) + insets.right,
      };

  // Pass container alignment properties through to ScrollView's contentContainerStyle
  // so the ScrollView acts as a transparent layer (designer has no ScrollView)
  const alignmentStyle = isScrollable
    ? {
        alignItems: flattenedStyle?.alignItems,
        justifyContent: flattenedStyle?.justifyContent,
        alignContent: flattenedStyle?.alignContent,
      }
    : undefined;

  const renderContent = () => {
    if (isScrollable) {
      return (
        <ScrollView
          testID={`scrollView-${testId}`}
          style={styles.scrollViewOuterStyle}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...scrollViewProps}
          contentContainerStyle={[
            styles.scrollViewStyle,
            alignmentStyle,
            scrollViewContentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      );
    }
    return children;
  };

  if (hasGradient) {
    return (
      <LinearGradient
        testID={testId}
        colors={_gradientColors}
        {...(_gradientStops ? { locations: _gradientStops } : {})}
        {...(_gradientStart ? { start: _gradientStart } : {})}
        {...(_gradientEnd ? { end: _gradientEnd } : {})}
        {...restProps}
        style={[styles.container, style]}
      >
        {renderContent()}
      </LinearGradient>
    );
  }

  return (
    <View
      testID={testId}
      {...restProps}
      style={[styles.container, style, safeAreaStyle]}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    borderColor: 'transparent',
  },
  scrollViewOuterStyle: {
    alignSelf: 'stretch',
  },
  scrollViewStyle: {
    flexGrow: 1,
    overflow: 'visible',
  },
});

export default ASContainer;
