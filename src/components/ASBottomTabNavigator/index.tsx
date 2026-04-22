import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import ASText from '@/components/ASText';

const Tab = createBottomTabNavigator();
type BottomTabRoute = BottomTabBarProps['state']['routes'][number];

export type IconRenderFn = (props: {
  color: string;
  size: number;
}) => React.ReactNode;

export type ASTabItemProps = {
  name: string;
  component: React.ComponentType<object>;
  title: string;
  icon: string | React.FC<SvgProps> | IconRenderFn;
  tabStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  selectedBackgroundColor?: string;
};

export type ASBottomTabNavigationProps = {
  tabs: ASTabItemProps[];
  activeColor?: string;
  inactiveColor?: string;
  tabBarStyle?: ViewStyle;
  showLabels?: boolean;
  fabIcon?: IconRenderFn | string;
  fabOnPress?: () => void;
  fabStyle?: ViewStyle;
};

const ICON_SIZE = 24;

/** Renders the right icon component given a string (Material Icon / URL), SVG, or render fn */
const TabIconView: React.FC<{
  icon: string | React.FC<SvgProps> | IconRenderFn;
  tintColor: string;
}> = ({ icon, tintColor }) => {
  if (typeof icon === 'function') {
    // Detect SvgProps components vs render functions by checking parameter count
    // Render functions accept {color, size}, SVG components accept SvgProps
    try {
      const result = (icon as IconRenderFn)({
        color: tintColor,
        size: ICON_SIZE,
      });
      if (React.isValidElement(result)) return <>{result}</>;
    } catch {}
    const SVGIcon = icon as React.FC<SvgProps>;
    return <SVGIcon width={ICON_SIZE} height={ICON_SIZE} fill={tintColor} />;
  }
  if (typeof icon === 'string') {
    const isURL =
      icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('data:');
    if (isURL) {
      return (
        <Image
          source={{ uri: icon }}
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
        />
      );
    }
    return (
      <ASText
        style={{
          fontSize: ICON_SIZE,
          fontFamily: 'Material Icon',
          color: tintColor,
        }}
        accessibilityLabel={'tab_icon'}
      >
        {icon}
      </ASText>
    );
  }
  return null;
};

/* ───────────────────────────────────────────────────────────────────
   Notched tab bar – SVG background with a concave cutout for the FAB
   ─────────────────────────────────────────────────────────────────── */
const NotchedTabBar: React.FC<{
  state: BottomTabBarProps['state'];
  descriptors: BottomTabBarProps['descriptors'];
  navigation: BottomTabBarProps['navigation'];
  tabs: ASTabItemProps[];
  activeColor: string;
  inactiveColor: string;
  tabBarStyle?: ViewStyle;
  notchWidth: number;
  notchDepth: number;
  showLabels?: boolean;
  fabIcon?: IconRenderFn | string;
  fabOnPress?: () => void;
  fabStyle?: ViewStyle;
}> = ({
  state,
  navigation,
  tabs,
  activeColor,
  inactiveColor,
  tabBarStyle,
  notchWidth,
  notchDepth,
  showLabels = true,
  fabIcon,
  fabOnPress,
  fabStyle,
}) => {
  const { width: W } = Dimensions.get('window');
  const H = (tabBarStyle?.height as number) || 65;
  const brL = (tabBarStyle?.borderTopLeftRadius as number) || 0;
  const brR = (tabBarStyle?.borderTopRightRadius as number) || 0;
  const bgColor = (tabBarStyle?.backgroundColor as string) || '#ffffff';

  const cx = W / 2;
  const hr = notchWidth / 2;
  const nd = notchDepth;
  const margin = 18; // smooth blend region between straight edge and curve

  // SVG path: flat white bar with a smooth concave notch at the center.
  // Two symmetric cubic-bézier curves create the U-shape.
  const svgPath = [
    `M 0,${brL}`,
    brL > 0 ? `Q 0,0 ${brL},0` : '',
    `L ${cx - hr - margin},0`,
    `C ${cx - hr},0 ${cx - nd * 0.75},${nd} ${cx},${nd}`,
    `C ${cx + nd * 0.75},${nd} ${cx + hr},0 ${cx + hr + margin},0`,
    `L ${W - brR},0`,
    brR > 0 ? `Q ${W},0 ${W},${brR}` : '',
    `L ${W},${H}`,
    `L 0,${H}`,
    `Z`,
  ]
    .filter(Boolean)
    .join(' ');

  // Split tabs: left half | center spacer for FAB | right half
  const midIndex = Math.ceil(state.routes.length / 2);

  const renderTab = (route: BottomTabRoute, globalIndex: number) => {
    const tab = tabs.find((t) => t.name === route.name);
    if (!tab) return null;
    const isFocused = state.index === globalIndex;
    const color = isFocused ? activeColor : inactiveColor;

    return (
      <TouchableOpacity
        key={route.key}
        style={[
          styles.customTabButton,
          isFocused && tab.selectedBackgroundColor
            ? { backgroundColor: tab.selectedBackgroundColor }
            : undefined,
          tab.tabStyle,
        ]}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }}
      >
        <TabIconView icon={tab.icon} tintColor={color} />
        {showLabels && (
          <Text style={[styles.tabLabel, { color }, tab.labelStyle]}>
            {tab.title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const FAB_SIZE = 56;

  return (
    <View
      style={[
        styles.notchedContainer,
        {
          height: H,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
      ]}
    >
      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
        <Path d={svgPath} fill={bgColor} />
      </Svg>
      <View style={styles.tabButtonsRow}>
        {state.routes
          .slice(0, midIndex)
          .map((route: BottomTabRoute, i: number) => renderTab(route, i))}
        {/* Center spacer – leaves room for the FAB floating above */}
        <View style={{ width: notchWidth + 20 }} />
        {state.routes
          .slice(midIndex)
          .map((route: BottomTabRoute, i: number) =>
            renderTab(route, midIndex + i),
          )}
      </View>
      {fabIcon && (
        <TouchableOpacity
          style={[
            styles.fab,
            {
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: FAB_SIZE / 2,
              left: W / 2 - FAB_SIZE / 2,
              top: -(FAB_SIZE / 2) + notchDepth / 2,
            },
            fabStyle,
          ]}
          onPress={fabOnPress}
          activeOpacity={0.8}
        >
          {typeof fabIcon === 'function' ? (
            fabIcon({ color: '#FFFFFF', size: 28 })
          ) : (
            <Image
              source={{ uri: fabIcon }}
              style={{ width: 28, height: 28, tintColor: '#FFFFFF' }}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

/* ───────────────────────────────────────────────────────────────────
   Main component
   ─────────────────────────────────────────────────────────────────── */
const ASBottomTabNavigation: React.FC<ASBottomTabNavigationProps> = ({
  tabs,
  activeColor = '#007AFF',
  inactiveColor = '#8e8e93',
  tabBarStyle,
  showLabels = true,
  fabIcon,
  fabOnPress,
  fabStyle,
}) => {
  // Auto-detect FAB notch mode: if borderTopLeftRadius is large enough
  // (e.g. >= 20), treat the tab bar as having a FAB cutout.
  const brTL = (tabBarStyle?.borderTopLeftRadius as number) || 0;
  const fabCutout = brTL >= 20;
  const fabCutoutWidth = 70;
  const fabCutoutDepth = 34;

  /* ── Notched mode (FAB cutout) ── */
  if (fabCutout) {
    return (
      <Tab.Navigator
        tabBar={(props) => (
          <NotchedTabBar
            {...props}
            tabs={tabs}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            tabBarStyle={tabBarStyle}
            notchWidth={fabCutoutWidth}
            notchDepth={fabCutoutDepth}
            showLabels={showLabels}
            fabIcon={fabIcon}
            fabOnPress={fabOnPress}
            fabStyle={fabStyle}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    );
  }

  /* ── Normal mode (flat tab bar, original behavior) ── */
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }) => {
        const tab = tabs.find((t) => t.name === route.name);
        return {
          tabBarStyle,
          headerShown: false,
          tabBarButton: (props: BottomTabBarButtonProps) => {
            const { onPress } = props;
            const isFocused =
              props.accessibilityState?.selected ??
              props['aria-selected'] ??
              false;
            const tintColor = isFocused ? activeColor : inactiveColor;
            if (!tab) return null;

            return (
              <TouchableOpacity
                style={[
                  styles.customTabButton,
                  isFocused && { backgroundColor: tab.selectedBackgroundColor },
                  tab.tabStyle,
                ]}
                onPress={onPress}
              >
                <TabIconView icon={tab.icon} tintColor={tintColor} />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: tintColor },
                    tab.labelStyle,
                  ]}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            );
          },
        };
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customTabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  notchedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  tabButtonsRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 4,
  },
});

export default ASBottomTabNavigation;
