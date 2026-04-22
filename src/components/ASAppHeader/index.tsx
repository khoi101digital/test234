import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toNumber } from '../../utils/common.utils';
import CustomIcon from '../CustomIcon';

type BackButtonProps = {
  isEnabled: boolean;
  icon: React.ReactNode | string;
  color?: string;
  size?: number | string;
  isLargerBackButton?: boolean;
  onPress?: () => void;
};

type HeaderTitleProps = {
  title: string;
  textStyles?: TextStyle;
  alignment?: 'left' | 'center' | 'right';
};

type ActionItem = {
  icon: React.ReactNode | string;
  iconSize?: number | string;
  alignment: 'left' | 'right';
  onPress: () => void;
  color?: string;
};

type ASAppHeaderProps = {
  styles?: ViewStyle;
  backButton?: BackButtonProps;
  headerTitle: HeaderTitleProps;
  actions?: ActionItem[];
  isPreview?: boolean;
};

const ASAppHeader: React.FC<ASAppHeaderProps> = ({
  styles: customStyles = {},
  backButton,
  headerTitle,
  actions = [],
  isPreview,
  ...restProps
}: ASAppHeaderProps) => {
  const renderActions = (alignment: 'left' | 'right') => {
    const filteredActions = actions.filter(
      (action) => action.alignment === alignment,
    );
    return filteredActions.map((action, idx) => (
      <TouchableOpacity
        key={`${alignment}-${idx}`}
        onPress={action.onPress}
        testID={`header-action-${alignment}-${idx}`}
        style={[
          stylesObj.actionButton,
          idx === filteredActions.length - 1 ? { marginRight: 0 } : null,
        ]} // Prevent last item to have marginRight
      >
        <CustomIcon
          icon={action.icon}
          size={action.iconSize}
          color={action.color}
        />
      </TouchableOpacity>
    ));
  };

  const renderBackButton = () => {
    if (!backButton?.isEnabled) return null;

    const btn = (
      <TouchableOpacity
        onPress={backButton.onPress}
        style={stylesObj.backButton}
        testID={'header-back-button'}
      >
        <CustomIcon
          icon={backButton.icon}
          size={backButton.size}
          color={backButton.color}
        />
      </TouchableOpacity>
    );

    if (backButton.isLargerBackButton) {
      return <View style={stylesObj.fullRowBack}>{btn}</View>;
    }

    return btn;
  };

  const insets = isPreview ? null : useSafeAreaInsets();

  return (
    <View
      {...restProps}
      style={[
        customStyles,
        {
          paddingTop: toNumber(customStyles?.paddingTop) + (insets?.top ?? 0), // Handle safe area view
          ...(typeof customStyles?.height === 'number'
            ? { height: customStyles.height + (insets?.top ?? 0) }
            : {}), // Only override height if it's a number
        },
      ]}
    >
      {backButton?.isEnabled &&
        backButton.isLargerBackButton &&
        renderBackButton()}
      {/* Full row back button (if enabled) */}
      {/* Main app header */}
      <View style={stylesObj.headerContainer}>
        <View style={stylesObj.leftContainer}>
          {!backButton?.isLargerBackButton && renderBackButton()}
          {renderActions('left')}
        </View>

        {/* Title */}
        <Text
          style={[
            stylesObj.titleLabel,
            headerTitle.textStyles,
            { textAlign: headerTitle.alignment },
          ]}
          numberOfLines={1}
        >
          {headerTitle.title}
        </Text>

        <View style={stylesObj.rightContainer}>{renderActions('right')}</View>
      </View>
    </View>
  );
};

const stylesObj = StyleSheet.create({
  titleLabel: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  backButton: {
    flex: 1,
  },
  fullRowBack: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionButton: {},
});

export default ASAppHeader;
