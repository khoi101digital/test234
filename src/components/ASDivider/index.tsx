import React from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeColors } from '../../context/ThemeContext';

export type ASDividerProps = {
  style?: StyleProp<ViewStyle>;
  marginVertical?: DimensionValue;
  width?: DimensionValue;
  testId?: string;
};

const ASDivider: React.FC<ASDividerProps> = (props: ASDividerProps) => {
  const colors = useThemeColors();
  const { style, testId = 'ASDivider' } = props || {};

  return <View testID={testId} style={style} />;
};

const styles = StyleSheet.create({});

export default ASDivider;
