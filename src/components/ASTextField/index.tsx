import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  Image,
  Platform,
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { useField } from 'formik';
import ASText from '../ASText';
import { ThemeContext } from '../../context/ThemeContext';
import { constants } from '../../utils/constants';
import ASOverlay from '../ASOverlay';
import ASImage from '../ASImage';
import { toNumber, getPlatformShadowStyle } from '../../utils/common.utils';
import CustomIcon from '../CustomIcon';

type TextFieldIcon = React.ComponentProps<typeof CustomIcon>['icon'];
type TextFieldIconStyle = ViewStyle & {
  iconSize?: number | string;
  color?: string;
};

export type ASTextFieldProps = Omit<TextInputMaskProps, 'type'> &
  TextInputProps & {
    name: string;
    prefixIcon?: ReactNode | string;
    prefixIconStyles: StyleProp<ViewStyle>;
    suffixIcon?: ReactNode | string;
    suffixIconStyles: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    formatError?: (error: string) => string;
    label?: string;
    textFieldType?: TextInputMaskTypeProp;
    formatNumber?: 'comma' | 'dot' | 'percentage' | undefined;
    prefixText?: string;
    prefixTextStyle?: StyleProp<TextStyle>;
    labelTextStyle?: TextStyle;
    inputTextStyle?: StyleProp<TextStyle>;
    errorMessageTextStyle?: StyleProp<TextStyle>;
    placeholderTextStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    borderErrorColor?: string;
    borderActiveColor?: string;
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
    isOverlayEnabled?: boolean;
    id?: string;
    onChange?: (text: string) => void;
    testId?: string;
    multiline?: boolean;
    numberOfLines?: number;
    maxNumberOfLines?: number;
    defaultValue?: string;
    autoFocus?: boolean;
  };

const ASTextField = (props: ASTextFieldProps) => {
  const { colors } = useContext(ThemeContext);
  const {
    name,
    onFocus,
    onBlur,
    suffixIcon,
    suffixIconStyles,
    prefixIcon,
    prefixText,
    prefixTextStyle,
    formatError,
    options,
    label,
    textFieldType = 'custom',
    formatNumber,
    labelTextStyle,
    inputTextStyle,
    borderErrorColor,
    borderActiveColor,
    style,
    errorMessageTextStyle,
    placeholderTextStyle,
    containerStyle,
    placeholderTextColor,
    accessibilityLabel,
    isOverlayEnabled,
    prefixIconStyles,
    maxNumberOfLines,
    id,
    onChange,
    testId = 'ASTextField',
    multiline,
    numberOfLines,
    defaultValue,
    autoFocus,
    contentContainerStyle,
    ...restProps
  } = props;
  const [active, setActive] = useState(false);
  const [field, meta, helpers] = useField(name);
  const showMask = options && Object.keys(options).length > 0;
  const inputRef = useRef<TextInput>(null);

  // Set default value on mount if field is empty
  useEffect(() => {
    if (defaultValue && !field.value) {
      helpers.setValue(defaultValue);
    }
  }, []);

  // Handle autoFocus for all platforms
  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);
  const flattenedStyle = StyleSheet.flatten(style) as ViewStyle;
  const flattenedLabelStyle = StyleSheet.flatten(labelTextStyle) || {};
  const labelFontSize =
    flattenedLabelStyle.fontSize || styles.labelStyle?.fontSize;
  const labelTopPosition = -labelFontSize * 0.8;
  const flattenedHeight = flattenedStyle?.height || 44;
  const handleOnFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setActive(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  // Triger this in onBlur envent
  const handleFormat = () => {
    let text = field.value;
    let numberValue =
      typeof text === 'string' ? parseFloat(text) : toNumber(text);

    if (!isNaN(numberValue)) {
      switch (formatNumber) {
        case 'comma':
          // Remove comma in the number so when format the already formatted (Ex: 123,456.00) number it's still working
          // because can't parseFloat a string with comma into Number
          // For ex: 123456 -> 123,456.00 and 123,456.00 -> 123,456.00
          // The same apply for "dot"
          text = parseFloat(text.replace(',', '')).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          break;
        case 'dot':
          text = parseFloat(text.replace('.', '')).toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          break;
        case 'percentage':
          const percentage = (numberValue * 100).toFixed(2);
          text = `${percentage}%`;
          break;

        default:
          text = field.value;
          break;
      }
    }

    field?.onChange(name)(text);
  };

  const handleOnBlur = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    handleFormat();
    setActive(false);
    field?.onBlur(name);
    helpers?.setTouched(true);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleOnChange = (e: string) => {
    let processedValue = e;

    // Handle autoCapitalize manually for web platform
    if (Platform.OS === 'web' && restProps.autoCapitalize && e) {
      switch (restProps.autoCapitalize) {
        case 'characters':
          processedValue = e.toUpperCase();
          break;
        case 'words':
          processedValue = e.replace(/\b\w/g, (char) => char.toUpperCase());
          break;
        case 'sentences':
          processedValue = e.replace(/(^\w|\.\s+\w)/g, (char) =>
            char.toUpperCase(),
          );
          break;
        case 'none':
        default:
          processedValue = e;
          break;
      }
    }

    field?.onChange(name)(processedValue);
    if (onChange) {
      onChange(processedValue);
    }
  };

  const getErrorMessage = (error: string) => {
    return formatError?.(error) ?? error;
  };

  const getBorderColor = () => {
    if (meta.error && meta.touched) {
      return borderErrorColor;
    }
    return active ? borderActiveColor : flattenedStyle?.borderColor;
  };

  // Calculate max number of lines for multiline input
  const getMaxNumberOfLines = () => {
    if (multiline && numberOfLines === undefined) {
      return maxNumberOfLines; // Default to maxNumberOfLines lines if multiline is true and numberOfLines is not defined
    }
    return numberOfLines;
  };

  const maxLines = getMaxNumberOfLines();

  // Get line height from inputTextStyle or calculate from fontSize
  const flattenedInputStyle = StyleSheet.flatten(inputTextStyle) as TextStyle;
  const fontSize = flattenedInputStyle?.fontSize || 14;
  const lineHeight = flattenedInputStyle?.lineHeight || fontSize * 1.53;

  // Calculate fixed height based on numberOfLines
  const getFixedHeight = () => {
    if (!multiline || !numberOfLines) return undefined;
    const calculatedHeight = numberOfLines * lineHeight + 10;
    return calculatedHeight;
  };

  const fixedHeight = getFixedHeight();

  const {
    flex: customFlex,
    width: customWidth,
    alignSelf: customAlignSelf,
    minWidth: customMinWidth,
    ...restFlattenedStyle
  } = flattenedStyle || {};

  // Separate text decoration and letter spacing styles from base input styles
  const flattenedInputTextStyle = StyleSheet.flatten(
    inputTextStyle,
  ) as TextStyle;
  const {
    fontWeight: inputFontWeight,
    fontStyle: inputFontStyle,
    textDecorationLine: inputTextDecorationLine,
    textDecorationStyle: inputTextDecorationStyle,
    textDecorationColor: inputTextDecorationColor,
    letterSpacing: inputLetterSpacing,
    ...baseInputTextStyle
  } = flattenedInputTextStyle || {};

  // Apply text decoration and letter spacing styles only when there's actual input
  const conditionalInputTextStyle = (() => {
    if (!field?.value) {
      // No value: use base styles without decorations and letter spacing
      return baseInputTextStyle;
    }

    // Text has value: apply all styles including decorations
    // Note: ASPasswordTextField handles filtering decorations for masked passwords
    return flattenedInputTextStyle;
  })();

  // Resolve placeholderTextColor from placeholderTextStyle if provided
  const flattenedPlaceholderStyle = StyleSheet.flatten(
    placeholderTextStyle,
  ) as TextStyle;
  const resolvedPlaceholderColor =
    flattenedPlaceholderStyle?.color ||
    placeholderTextColor ||
    constants.defaultPlaceholderColor;

  // Get platform-specific shadow style from flattened style
  const platformShadowStyle = getPlatformShadowStyle(flattenedStyle);

  const renderIcon = (
    icon: TextFieldIcon,
    iconStyles?: StyleProp<ViewStyle>,
  ) => {
    const flattenedIconStyle =
      (StyleSheet.flatten(iconStyles) as TextFieldIconStyle) || {};
    const iconSize =
      flattenedIconStyle.iconSize ||
      flattenedIconStyle.width ||
      flattenedIconStyle.height ||
      22;
    const iconColor = flattenedIconStyle.color;

    // Clone the element and pass size and color as props if it's a valid React element
    if (React.isValidElement(icon)) {
      return React.cloneElement(
        icon as React.ReactElement<{ size?: number | string; color?: string }>,
        {
          size: iconSize,
          color: iconColor,
        },
      );
    }

    return <CustomIcon icon={icon} size={iconSize} color={iconColor} />;
  };

  return (
    <View
      testID={`view-${testId}`}
      style={[
        styles.wrapperStyle,
        containerStyle,
        {
          height: 'auto',
          borderColor: 'transparent',
          ...(customFlex ? { flex: customFlex } : {}),
          ...(customWidth ? { width: customWidth } : {}),
          ...(customAlignSelf ? { alignSelf: customAlignSelf } : {}),
          ...(customMinWidth ? { minWidth: customMinWidth } : {}),
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      id={id}
    >
      <View
        style={[
          {
            height: multiline ? undefined : flattenedHeight,
          },
          platformShadowStyle,
          restFlattenedStyle,
          {
            borderColor: getBorderColor() || flattenedStyle?.borderColor,
          },
        ]}
      >
        <ASText
          testID={`label-${testId}`}
          numberOfLines={1}
          style={[
            styles.labelStyle,
            {
              backgroundColor: flattenedStyle?.backgroundColor,
              top: labelTopPosition,
              left: flattenedStyle?.paddingLeft,
            },
            labelTextStyle,
          ]}
        >
          {label}
        </ASText>
        <View style={contentContainerStyle}>
          {prefixIcon && (
            <View style={prefixIconStyles}>
              {renderIcon(prefixIcon, prefixIconStyles)}
            </View>
          )}
          {!!prefixText && (
            <ASText style={prefixTextStyle} testID={`prefixLabel-${testId}`}>
              {prefixText}
            </ASText>
          )}
          {showMask ? (
            <TextInputMask
              ref={
                inputRef as React.RefObject<
                  React.ElementRef<typeof TextInputMask>
                >
              }
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={`${field?.value}`}
              onChangeText={handleOnChange}
              style={[
                styles.textInputStyle,
                !!flattenedStyle?.width && { width: flattenedStyle.width },
                conditionalInputTextStyle,
                multiline && {
                  paddingTop: 10,
                },
                multiline &&
                  numberOfLines &&
                  Platform.OS === 'web' && {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: numberOfLines,
                    WebkitBoxOrient: 'vertical',
                  },
              ]}
              placeholderTextColor={resolvedPlaceholderColor}
              {...restProps}
              options={options}
              type={textFieldType}
              testID={`textInputMask-${testId}`}
              textAlignVertical='center'
              ellipsizeMode={multiline && numberOfLines ? 'tail' : undefined}
            />
          ) : (
            <TextInput
              ref={inputRef}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={`${field?.value}`}
              onChangeText={handleOnChange}
              style={[
                styles.textInputStyle,
                !!flattenedStyle?.width && { width: flattenedStyle.width },
                conditionalInputTextStyle,
                multiline && {
                  paddingTop: 10,
                },
                multiline &&
                  !flattenedStyle.height && {
                    height: fixedHeight ? fixedHeight : 20,
                  },
                multiline &&
                  numberOfLines &&
                  Platform.OS === 'web' && {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: numberOfLines,
                    WebkitBoxOrient: 'vertical',
                  },
              ]}
              placeholderTextColor={resolvedPlaceholderColor}
              textAlignVertical='center'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              testID={`textInput-${testId}`}
              multiline={multiline}
              maxLength={restProps.maxLength}
              ellipsizeMode={multiline && numberOfLines ? 'tail' : undefined}
              {...restProps}
            />
          )}
          {suffixIcon && (
            <View style={[styles.suffixIcon, suffixIconStyles]}>
              {renderIcon(suffixIcon, suffixIconStyles)}
            </View>
          )}
        </View>
      </View>
      {meta?.error && meta?.touched && (
        <ASText testID={`errorLabel-${testId}`} style={[errorMessageTextStyle]}>
          {getErrorMessage(meta?.error)}
        </ASText>
      )}
      {isOverlayEnabled && <ASOverlay />}
    </View>
  );
};

ASTextField.defaultProps = {
  type: 'custom',
};

const styles = StyleSheet.create({
  wrapperStyle: {
    position: 'relative',
  },
  labelStyle: {
    position: 'absolute',
  },
  inputContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  suffixIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ASTextField;
