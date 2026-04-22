import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  ScrollViewProps,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DotsIndicatorPosition =
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'center-left'
  | 'center-center'
  | 'center-right'
  | 'top-right'
  | 'top-center'
  | 'top-left';

export type ASPageViewProps = ScrollViewProps & {
  children: ReactNode[];
  style?: StyleProp<ViewStyle>;
  showDotsIndicator?: boolean;
  dotsIndicatorPosition?: DotsIndicatorPosition;
  axis?: 'horizontal' | 'vertical';
  activeDotColor?: string;
  inactiveDotColor?: string;
  expansionFactor?: number;
  paginationBottomPosition?: number;
  dotsIndicatorStyles?: StyleProp<ViewStyle>;
  snapToAlignment?: 'center' | 'end' | 'start';
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  testId?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getDotsPositionStyle = (
  position: DotsIndicatorPosition,
  bottomOffset: number,
): ViewStyle => {
  const [verticalPos = 'bottom', horizontalPos = 'center'] =
    position.split('-');

  const positionStyle: ViewStyle = {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  };

  switch (verticalPos) {
    case 'top':
      positionStyle.top = 0;
      break;
    case 'center':
      positionStyle.top = 0;
      positionStyle.bottom = 0;
      break;
    case 'bottom':
    default:
      positionStyle.bottom = bottomOffset;
      break;
  }

  switch (horizontalPos) {
    case 'left':
      positionStyle.left = 0;
      positionStyle.justifyContent = 'flex-start';
      break;
    case 'right':
      positionStyle.right = 0;
      positionStyle.justifyContent = 'flex-end';
      break;
    case 'center':
    default:
      positionStyle.left = 0;
      positionStyle.right = 0;
      positionStyle.justifyContent = 'center';
      break;
  }

  return positionStyle;
};

/**
 * Returns the index of the first child whose isDefaultPageView prop is true,
 * or 0 if none is found.
 */
const getDefaultPageIndex = (children: ReactNode[]): number => {
  const idx = children.findIndex(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).props?.isDefaultPageView === true,
  );
  return idx >= 0 ? Math.min(idx, children.length - 1) : 0;
};

// ─── Component ────────────────────────────────────────────────────────────────

const ASPageView: React.FC<ASPageViewProps> = (props) => {
  const { colors } = useContext(ThemeContext);

  const {
    children,
    showDotsIndicator = true,
    dotsIndicatorPosition = 'bottom-center',
    axis = 'horizontal',
    activeDotColor,
    inactiveDotColor,
    expansionFactor = 1,
    paginationBottomPosition = 0,
    dotsIndicatorStyles,
    snapToAlignment = 'center',
    showsHorizontalScrollIndicator = false,
    showsVerticalScrollIndicator = false,
    testId = 'ASPageView',
    style,
    ...restScrollProps
  } = props;

  const horizontal = axis === 'horizontal';
  const childArray = React.Children.toArray(children);
  const pageCount = childArray.length;
  const defaultPageIndex = getDefaultPageIndex(childArray);

  // ── Layout state ──────────────────────────────────────────────────────────

  const screenDims = Dimensions.get('window');
  const flatStyle = StyleSheet.flatten(style) as ViewStyle | undefined;

  /**
   * Track the measured dimensions of the outer container (the View that wraps
   * everything). These become the authoritative page dimensions passed down to
   * each slide cell so they always fill the viewport exactly.
   */
  const [containerWidth, setContainerWidth] = useState<number>(
    typeof flatStyle?.width === 'number' ? flatStyle.width : screenDims.width,
  );
  const [containerHeight, setContainerHeight] = useState<number>(
    typeof flatStyle?.height === 'number'
      ? flatStyle.height
      : screenDims.height,
  );

  const [activeIndex, setActiveIndex] = useState<number>(defaultPageIndex);
  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledToInitial = useRef(false);

  // ── Dot styling ───────────────────────────────────────────────────────────

  const flatDotsStyle = StyleSheet.flatten(dotsIndicatorStyles) as
    | (ViewStyle & { gap?: number })
    | undefined;
  const dotWidth =
    typeof flatDotsStyle?.width === 'number' ? flatDotsStyle.width : 8;
  const dotHeight =
    typeof flatDotsStyle?.height === 'number' ? flatDotsStyle.height : 8;
  const dotGap = typeof flatDotsStyle?.gap === 'number' ? flatDotsStyle.gap : 4;
  const dotBorderRadius =
    typeof flatDotsStyle?.borderRadius === 'number'
      ? flatDotsStyle.borderRadius
      : dotWidth / 2;

  const dotActiveColor = activeDotColor || colors?.primaryColor || '#D61355';
  const dotInactiveColor = inactiveDotColor || '#E0E0E0';

  // ── Outer container style ─────────────────────────────────────────────────

  /**
   * The outer container is the source-of-truth for dimensions: we measure it
   * via onLayout and pass those values down to every slide cell.
   *
   * Height is driven entirely by the caller's style prop:
   *   • Explicit height (e.g. height: 400) → honour it as-is.
   *   • No explicit height → default to flex: 1 so the component fills its
   *     parent (the parent is responsible for constraining the space).
   *
   * There is no child-inspection heuristic here — ASPageView does not peek
   * at ASPageViewPage styles to decide its own height.
   */
  const outerStyle: ViewStyle = {
    ...(flatStyle || {}),
    overflow: 'hidden',
    position: 'relative',
    ...(flatStyle?.height === undefined && flatStyle?.flex === undefined
      ? { flex: 1 }
      : {}),
  };

  // ── Scroll to default page after first layout ─────────────────────────────

  useEffect(() => {
    if (
      defaultPageIndex > 0 &&
      !hasScrolledToInitial.current &&
      containerWidth > 0 &&
      scrollViewRef.current
    ) {
      hasScrolledToInitial.current = true;
      scrollViewRef.current.scrollTo(
        horizontal
          ? { x: defaultPageIndex * containerWidth, animated: false }
          : { y: defaultPageIndex * containerHeight, animated: false },
      );
    }
  }, [defaultPageIndex, containerWidth, containerHeight, horizontal]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  /**
   * Capture the outer container dimensions. We use this single measurement
   * point for both width and height so slide cells are always sized correctly.
   */
  const onContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0) setContainerWidth(width);
    if (height > 0) setContainerHeight(height);
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const offset = horizontal ? contentOffset.x : contentOffset.y;
      const pageSize = horizontal ? containerWidth : containerHeight;
      if (pageSize <= 0) return;
      const index = Math.round(offset / pageSize);
      if (index !== activeIndex && index >= 0 && index < pageCount) {
        setActiveIndex(index);
      }
    },
    [horizontal, containerWidth, containerHeight, activeIndex, pageCount],
  );

  // ── Web: inject CSS scroll-snap ───────────────────────────────────────────
  //
  // React Native Web's pagingEnabled implementation can be unreliable for
  // vertical scrolling. We use a CSS trick to ensure snapping always works
  // on web regardless of direction.

  const scrollViewWebStyle: ViewStyle | undefined =
    Platform.OS === 'web'
      ? ({
          // These are CSS properties understood by RN Web.
          scrollSnapType: horizontal ? 'x mandatory' : 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        } as any)
      : undefined;

  const slideWebStyle: ViewStyle | undefined =
    Platform.OS === 'web'
      ? ({ scrollSnapAlign: snapToAlignment } as any)
      : undefined;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View
      style={outerStyle}
      onLayout={onContainerLayout}
      testID={`view-${testId}`}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal={horizontal}
        decelerationRate='fast'
        pagingEnabled={true}
        snapToAlignment={snapToAlignment}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onScroll={onScroll}
        scrollEventThrottle={16}
        testID={`scrollView-${testId}`}
        /**
         * The ScrollView must fill the outer container completely so each
         * "page" dimension equals containerWidth × containerHeight.
         */
        style={[styles.scrollView, scrollViewWebStyle]}
        contentContainerStyle={
          horizontal ? styles.contentHorizontal : styles.contentVertical
        }
        {...restScrollProps}
      >
        {childArray.map((page, index) => (
          <View
            key={index}
            testID={`childView-${index}-${testId}`}
            /**
             * Each slide cell is sized to EXACTLY match the outer container.
             * This is the critical fix: previously slideHeight was measured
             * from the ScrollView's own onLayout which could be 0 or wrong
             * when flex: 1 / height: '100%' was involved.
             */
            style={[
              styles.slide,
              {
                width: containerWidth,
                height: containerHeight,
              },
              slideWebStyle,
            ]}
          >
            {page}
          </View>
        ))}
      </ScrollView>

      {showDotsIndicator && pageCount > 1 && (
        <View
          testID={`pagination-${testId}`}
          style={[
            getDotsPositionStyle(
              dotsIndicatorPosition,
              paginationBottomPosition,
            ),
            { paddingVertical: 8, gap: dotGap },
          ]}
          pointerEvents='none'
        >
          {Array.from({ length: pageCount }).map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <View
                key={index}
                testID={`dot-${index}-${testId}`}
                style={{
                  width: isActive ? dotWidth * expansionFactor : dotWidth,
                  height: dotHeight,
                  borderRadius: dotBorderRadius,
                  backgroundColor: isActive ? dotActiveColor : dotInactiveColor,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollView: {
    /**
     * The ScrollView itself must grow to fill the outer container.
     * flex: 1 does this correctly in both native and web contexts.
     */
    flex: 1,
  },
  /**
   * For horizontal carousels: pages are laid out in a row.
   * We do NOT set flexGrow here — let each slide's explicit width drive the
   * content width, which is what triggers paging.
   */
  contentHorizontal: {
    flexDirection: 'row',
  },
  /**
   * For vertical carousels: pages stacked in a column.
   */
  contentVertical: {
    flexDirection: 'column',
  },
  slide: {
    /**
     * flexShrink: 0 prevents the ScrollView from squishing slides when
     * contentContainerStyle doesn't have an explicit size.
     * overflow: hidden clips anything that escapes the slide boundary.
     */
    flexShrink: 0,
    overflow: 'hidden',
  },
});

export default ASPageView;
