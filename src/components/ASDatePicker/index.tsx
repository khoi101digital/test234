import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  ModalProps,
  NativeSyntheticEvent,
  TouchableOpacity,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  TextInput,
  ImageStyle,
} from 'react-native';
import { useField } from 'formik';
import ASText from '../ASText';
import { ThemeContext } from '../../context/ThemeContext';
import ASOverlay from '../ASOverlay';
import ASImage from '../ASImage';
import ASCalendar from '../ASCalendar';
import ASPopUp from '../ASPopUp';
import ASColumn from '../ASColumn';
import ASRow from '../ASRow';
import ASButton from '../ASButton';
import { constants } from '../../utils/constants';
import { format } from 'date-fns';
import { getPlatformShadowStyle } from '../../utils/common.utils';

export type ASDatePickerProps = TextInputProps &
  ModalProps & {
    onClose?: () => void;
    dateFormat?: string;
  } & {
    name: string;
    prefixIcon?: ReactNode | string;
    suffixIcon?: ReactNode | string;
    formatError?: (error: string) => string;
    label?: string;
    formatNumber?: 'comma' | 'dot' | 'percentage' | undefined;
    prefixText?: string;
    prefixTextStyle?: StyleProp<TextStyle>;
    labelTextStyle?: StyleProp<TextStyle>;
    inputTextStyle?: StyleProp<TextStyle>;
    errorMessageTextStyle?: StyleProp<TextStyle>;
    borderErrorColor?: string;
    borderActiveColor?: string;
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
    isOverlayEnabled?: boolean;
    id?: string;
    onChange?: (text: string) => void;
    isDefaultCurrentDate?: boolean;
    defaultDate?: string;
    range?: 'past' | 'future';
    maxDate?: string;
    minDate?: string;
    displayDateFormat?: string;
    selectedDateFormat?: string;
    selectedDayBackgroundColor?: string;
    selectedDayTextColor?: string;
    todayTextColor?: string;
    arrowColor?: string;
    dayTextColor?: string;
    calendarBackground?: string;
    textSectionTitleColor?: string;
    iconSize?: number;
    iconStyles?: StyleProp<ImageStyle>;
    calendarPopupStyles?: StyleProp<ViewStyle>;
  };

const ASDatePicker = (props: ASDatePickerProps) => {
  const { colors } = useContext(ThemeContext);
  const {
    name,
    onFocus,
    onBlur,
    suffixIcon,
    prefixIcon,
    prefixText,
    prefixTextStyle,
    formatError,
    label,
    formatNumber,
    labelTextStyle,
    inputTextStyle,
    borderErrorColor,
    borderActiveColor,
    style,
    containerStyle,
    errorMessageTextStyle,
    placeholderTextColor,
    accessibilityLabel,
    isOverlayEnabled,
    id,
    onChange,
    isDefaultCurrentDate,
    minDate,
    maxDate,
    range,
    displayDateFormat,
    selectedDateFormat,
    selectedDayBackgroundColor,
    selectedDayTextColor,
    todayTextColor,
    arrowColor,
    dayTextColor,
    calendarBackground,
    textSectionTitleColor,
    iconSize,
    iconStyles,
    defaultDate,
    calendarPopupStyles,
    ...restProps
  } = props;
  const [active, setActive] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [field, meta] = useField(name);
  const [selectingDate, setSelectingDate] = useState<string>();

  // Merge both style and containerStyle, with containerStyle taking priority
  const mergedStyle = StyleSheet.flatten([style, containerStyle]) as ViewStyle;
  const flattenedStyle = mergedStyle;
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

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (!!isDefaultCurrentDate) {
      field.onChange(name)(format(today, selectedDateFormat));
    } else if (defaultDate) {
      field.onChange(name)(format(defaultDate, selectedDateFormat));
    }
  }, [isDefaultCurrentDate, defaultDate]);

  const getBorderColor = () => {
    if (meta.error && meta.touched) {
      return borderErrorColor;
    }
    return isVisible ? borderActiveColor : flattenedStyle?.borderColor;
  };

  const onCloseIsVisible = async () => {
    setIsVisible(!isVisible);
  };

  const onOpenIsVisible = async () => {
    setIsVisible(!isVisible);
  };

  const renderDateFormat = field.value
    ? format(field.value, displayDateFormat)
    : '';

  // Separate text decoration styles from base input styles
  const flattenedInputTextStyle = StyleSheet.flatten(
    inputTextStyle,
  ) as TextStyle;
  const {
    fontWeight: inputFontWeight,
    fontStyle: inputFontStyle,
    textDecorationLine: inputTextDecorationLine,
    textDecorationStyle: inputTextDecorationStyle,
    textDecorationColor: inputTextDecorationColor,
    ...baseInputTextStyle
  } = flattenedInputTextStyle || {};

  // Apply text decoration styles only when there's actual input
  const conditionalInputTextStyle = field?.value
    ? flattenedInputTextStyle
    : baseInputTextStyle;

  // Extract custom properties from flattenedStyle to avoid override
  const {
    paddingTop: customPaddingTop,
    paddingBottom: customPaddingBottom,
    paddingVertical: customPaddingVertical,
    marginBottom: customMarginBottom,
    flex: customFlex,
    width: customWidth,
    alignSelf: customAlignSelf,
    ...restFlattenedStyle
  } = flattenedStyle || {};

  // Get platform-specific shadow style from flattened style
  const platformShadowStyle = getPlatformShadowStyle(flattenedStyle);

  return (
    <TouchableOpacity
      onPress={onOpenIsVisible}
      style={[
        styles.wrapperStyle,
        {
          height: 'auto',
          borderColor: 'transparent',
          marginBottom: customMarginBottom || 0,
          ...(customFlex ? { flex: customFlex } : {}),
          ...(customWidth ? { width: customWidth } : {}),
          ...(customAlignSelf ? { alignSelf: customAlignSelf } : {}),
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      id={id}
    >
      <View
        style={[
          styles.containerStyle,
          restFlattenedStyle,
          {
            borderColor: getBorderColor() || flattenedStyle?.borderColor,
            height: flattenedHeight,
            borderTopWidth: flattenedStyle?.borderTopWidth,
            borderRightWidth: flattenedStyle?.borderRightWidth,
            borderBottomWidth: flattenedStyle?.borderBottomWidth,
            borderLeftWidth: flattenedStyle?.borderLeftWidth,
            ...(flattenedStyle &&
              'borderRadius' in flattenedStyle &&
              flattenedStyle.borderRadius !== undefined && {
                borderRadius: flattenedStyle.borderRadius,
              }),
            marginBottom: 0,
          },
          platformShadowStyle,
        ]}
      >
        <ASText
          numberOfLines={1}
          style={[
            styles.labelStyle,
            {
              backgroundColor: flattenedStyle?.backgroundColor || 'white',
              top: labelTopPosition,
              left: flattenedStyle?.paddingLeft,
            },
            labelTextStyle,
          ]}
        >
          {label}
        </ASText>
        <View style={styles.contentContainerStyle}>
          {prefixIcon && (
            <View style={styles.prefixIcon}>
              <ASText
                style={{
                  fontSize: iconStyles?.iconSize,
                  fontFamily: 'Material Icon',
                  color: iconStyles?.iconColor,
                }}
              >
                {prefixIcon}
              </ASText>
            </View>
          )}
          {!!prefixText && (
            <ASText style={[styles.prefixText, prefixTextStyle]}>
              {prefixText}
            </ASText>
          )}
          <View style={styles.inputContainerStyle}>
            <TextInput
              onFocus={handleOnFocus}
              value={field?.value ? renderDateFormat : undefined}
              style={[
                !!flattenedStyle?.width && { width: flattenedStyle.width },
                conditionalInputTextStyle,
              ]}
              placeholderTextColor={
                placeholderTextColor || constants.defaultPlaceholderColor
              }
              autoComplete={'off'}
              autoCorrect={false}
              editable={false}
              underlineColorAndroid='transparent'
              placeholder={displayDateFormat ?? 'yyyy-MM-dd'}
              {...restProps}
            />
          </View>
          {suffixIcon && (
            <View style={styles.suffixIcon}>
              <ASText
                style={{
                  fontSize: iconStyles?.iconSize,
                  fontFamily: 'Material Icon',
                  color: iconStyles?.iconColor,
                }}
              >
                {suffixIcon}
              </ASText>
            </View>
          )}
        </View>
      </View>
      {isOverlayEnabled && <ASOverlay />}
      <ASPopUp
        {...restProps}
        containerStyles={calendarPopupStyles}
        onClose={() => {}}
        visible={isVisible}
        isShowCloseIcon={false}
      >
        <ASColumn
          style={{
            paddingVertical: 40,
            paddingHorizontal: 14,
            justifyContent: 'center',
            borderRadius: 8,
            width: '90%',
            overflow: 'hidden',
          }}
        >
          <ASCalendar
            selectedDayBackgroundColor={selectedDayBackgroundColor}
            selectedDayTextColor={selectedDayTextColor}
            todayTextColor={todayTextColor}
            arrowColor={arrowColor}
            dayTextColor={dayTextColor ?? ''}
            calendarBackground={calendarBackground ?? ''}
            textSectionTitleColor={textSectionTitleColor ?? ''}
            minDate={
              minDate
                ? minDate
                : range
                  ? range === 'future'
                    ? today
                    : undefined
                  : undefined
            }
            maxDate={
              maxDate
                ? maxDate
                : range
                  ? range === 'past'
                    ? today
                    : undefined
                  : undefined
            }
            markedDates={
              selectingDate
                ? {
                    [selectingDate]: { selected: true },
                  }
                : undefined
            }
            onDayPress={(date) => {
              onCloseIsVisible();
              if (date) {
                field.onChange(name)(
                  format(date.dateString, selectedDateFormat),
                );
              }
            }}
          />
        </ASColumn>
      </ASPopUp>
    </TouchableOpacity>
  );
};

ASDatePicker.defaultProps = {
  type: 'custom',
};

const styles = StyleSheet.create({
  wrapperStyle: {
    position: 'relative',
  },
  class_8pqr824r1: { color: 'white' },
  containerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 2,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: 'transparent',
  },
  contentContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelStyle: {
    position: 'absolute',
  },
  inputContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixIcon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefixText: {
    marginRight: 4,
  },
});

export default ASDatePicker;
