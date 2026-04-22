import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeColors } from '../../context/ThemeContext';
import ASText from '../ASText';
import { ArrowBackIcon } from '../../assets/icon';

export type ASBackButtonProps = {
  backIconColor?: string | undefined;
  backIconSize?: number | undefined;
  onPressBackButton?: () => void;
  isPreviewScreen?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  testId?: string;
};

export type ASAppBarProps = ASBackButtonProps & {
  title?: string;
  traillingIcon?: React.ReactNode;
};

export const DefaultBackButton = (props: ASBackButtonProps) => {
  const colors = useThemeColors();
  const {
    backIconColor,
    backIconSize,
    onPressBackButton,
    testId,
    ...restProps
  } = props || {};
  return (
    <TouchableOpacity
      testID={testId}
      activeOpacity={0.8}
      style={styles.backIcon}
      onPress={onPressBackButton}
      {...restProps}
    >
      <ArrowBackIcon size={backIconSize} color={backIconColor} />
    </TouchableOpacity>
  );
};

const ASAppBar: React.FC<ASAppBarProps> = (props: ASAppBarProps) => {
  const {
    backIconColor,
    backIconSize,
    onPressBackButton,
    title,
    traillingIcon,
    isPreviewScreen,
    style,
    textStyles,
    testId = 'ASAppBar',
  } = props || {};
  return (
    <View
      testID={`view-${testId}`}
      style={[
        styles.container,
        { paddingTop: isPreviewScreen ? 22 : 0 },
        StyleSheet.flatten(style),
      ]}
    >
      <DefaultBackButton
        testId={`defaultBackButton-${testId}`}
        backIconColor={backIconColor}
        backIconSize={backIconSize}
        onPressBackButton={onPressBackButton}
      />
      <ASText testId={`title-${testId}`} style={textStyles}>
        {title}
      </ASText>
      {traillingIcon ? traillingIcon : <View style={{ flex: 1 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
  },
});

export default ASAppBar;
