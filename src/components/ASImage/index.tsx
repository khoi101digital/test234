import React from 'react';
import {
  DimensionValue,
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { ImageResizeMode } from 'react-native/Libraries/Image/ImageResizeMode';
import {
  convertPercentageToPx,
  getPlatformShadowStyle,
} from '../../utils/common.utils';

export type ASImageProps = Omit<ImageProps, 'source'> & {
  source: string | ImageSourcePropType; // Allow string or valid ImageSourcePropType    style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  height?: DimensionValue;
  width?: DimensionValue;
  roundImageSize?: string | number;
  accessibilityLabel?: string;
  testId?: string;
};

const ASImage: React.FC<ASImageProps> = (props) => {
  const {
    source,
    style,
    roundImageSize,
    testId = 'ASImage',
    ...restProps
  } = props;
  const imageSource: ImageSourcePropType =
    typeof source === 'string' ? { uri: source } : source;
  const roundImageSizeValue = convertPercentageToPx(roundImageSize, true) || 0;

  // Get platform-specific shadow style from flattened style
  const flattenedStyle = StyleSheet.flatten(style);
  const platformShadowStyle = getPlatformShadowStyle(flattenedStyle);

  // Preserve percentage-based width/height from style for responsive layout
  // instead of converting to fixed pixels
  const styleWidth = (flattenedStyle as any)?.width;
  const styleHeight = (flattenedStyle as any)?.height;
  const isResponsiveWidth =
    typeof styleWidth === 'string' && styleWidth.endsWith('%');
  const isResponsiveHeight =
    typeof styleHeight === 'string' && styleHeight.endsWith('%');

  const defaultWidth = roundImageSizeValue || '100%';
  const defaultHeight = roundImageSizeValue || '100%';

  return (
    <Image
      testID={testId}
      source={imageSource}
      style={[
        {
          width: defaultWidth,
          height: defaultHeight,
          borderRadius: roundImageSizeValue || 0,
        },
        style,
        // Re-apply responsive percentage values if they were in the original style,
        // ensuring they are not lost due to style merging
        ...(isResponsiveWidth ? [{ width: styleWidth }] : []),
        ...(isResponsiveHeight ? [{ height: styleHeight }] : []),
        platformShadowStyle,
      ]}
      {...restProps}
      resizeMode={props?.resizeMode}
    />
  );
};

export default ASImage;
