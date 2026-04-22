import React from 'react';
import {
  Image,
  View,
  ImageStyle,
  TextStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import ASText from '../ASText';
import { toNumber } from '../../utils/common.utils';

export interface CustomIconProps {
  icon?: string | React.ReactNode;
  size?: number | string;
  color?: string;
  style?: ImageStyle | TextStyle | ViewStyle;
  testId?: string;
  accessibilityLabel?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  size,
  color,
  style = {},
  testId,
  accessibilityLabel,
  crossOrigin,
}) => {
  if (!icon) return null;

  const numericSize = size ? toNumber(size) : 0;

  // ======================
  // STRING ICON
  // ======================
  if (typeof icon === 'string') {
    // URL / base64 icon
    if (
      icon.startsWith('data:') ||
      icon.startsWith('http://') ||
      icon.startsWith('https://')
    ) {
      if (Platform.OS === 'web') {
        return (
          <View
            style={{
              width: numericSize,
              height: numericSize,
              overflow: 'visible' as const,
              ...(style as ViewStyle),
            }}
          >
            {React.createElement('img', {
              src: icon,
              style: {
                width: numericSize,
                height: numericSize,
                ...(color !== undefined && color !== null
                  ? { tintColor: color }
                  : {}),
              },
              crossOrigin,
            })}
          </View>
        );
      }
      return (
        <Image
          source={{ uri: icon }}
          style={{
            width: numericSize,
            height: numericSize,
            overflow: 'visible',
            ...(color !== undefined && color !== null
              ? { tintColor: color }
              : {}),
            ...(style as ImageStyle),
          }}
          crossOrigin={crossOrigin}
        />
      );
    }

    // Material Icon (font-based)

    return (
      <ASText
        style={{
          fontSize: numericSize !== 0 ? numericSize : 1,
          fontFamily: Platform.OS === 'web' ? 'Material Icon' : 'MaterialIcons',
          fontWeight: Platform.OS === 'web' ? 'bold' : 'normal',
          color,
          ...(style as TextStyle),
        }}
        accessibilityLabel={accessibilityLabel || 'icon'}
      >
        {icon}
      </ASText>
    );
  }

  // ======================
  // REACT NODE ICON
  // ======================
  return (
    <View
      style={{
        width: numericSize,
        height: numericSize,
        ...(style as ViewStyle),
      }}
    >
      {icon}
    </View>
  );
};

export default CustomIcon;
