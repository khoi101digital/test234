import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ASText from '../ASText';
import {
  FlatList,
  FlatListProps,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import ASButton from '../ASButton';
import ASRow from '../ASRow';
import ASColumn from '../ASColumn';
import { DeleteIcon, ForwardIcon } from '../../assets/icon';
import { useThemeColors } from '../../context/ThemeContext';
import { useField } from 'formik';
import ASOverlay from '../ASOverlay';
import CustomIcon from '../CustomIcon';

const KEYBOARDS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  {
    label: '3',
    value: '3',
  },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  {
    label: '7',
    value: '7',
  },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: 'delete', value: 'delete' },
  {
    label: '0',
    value: '0',
  },
  { label: 'continue', value: 'continue' },
];

export type ASPinProps = KeyboardProps & {
  pinLength?: number;
  onPress: (item: string) => void;
  children?: ReactNode;
  onChange?: (item: string) => void;
  keyboardTypography?: TextStyle;
  inputTypography?: TextStyle;
  gap?: number;
  style?: ViewStyle;
  keyboardButtonRadius?: number;
  enableNativeKeyboard?: boolean;
  pinBoxRadius?: number;
  pinBoxSize?: number;
  pinBoxBorderColor?: string;
  pinBoxBackgroundColor?: string;
  keyboardButtonBorderColor?: string;
  keyboardButtonBackgroundColor?: string;
  isOverlayEnabled?: boolean;
  name: string;
  contentContainerStyle?: ViewStyle;
  columnWrapperStyle?: ViewStyle;
  testId?: string;
  keyboardButtonSize?: DimensionValue;
  pinBoxBorderWidth: number;
  pinBoxGap?: number;
};

export type KeyboardProps = {
  submitButtonIcon?: ReactNode;
  submitButtonStyle?: StyleProp<ViewStyle>;
  deleteButtonIcon?: ReactNode;
  deleteButtonStyle?: StyleProp<ViewStyle>;
  flatListProps?: FlatListProps<KeyboardItemProps>;
  onKeyboardPress?: (item: KeyboardItemProps) => void;
  typography?: TextStyle;
  keyboardButtonRadius?: number;
  keyboardButtonBorderColor?: string;
  keyboardButtonBackgroundColor?: string;
  keyboardStyle?: StyleProp<ViewStyle>;
  buttonIconColor?: string;
  contentContainerStyle?: ViewStyle;
  columnWrapperStyle?: ViewStyle;
  keyboardButtonSize?: DimensionValue;
  iconSize: number;
};

export type KeyboardItemProps = {
  label: string;
  value: string;
};

export type PinInputListProps = {
  pinLength: number;
  pin: string[];
  inputTypography?: TextStyle;
  onKeyboardPress: (item: KeyboardItemProps) => void;
  enableNativeKeyboard?: boolean;
  pinBoxRadius?: number;
  pinBoxSize?: number;
  pinBoxBorderColor?: string;
  pinBoxBackgroundColor?: string;
  onPress: (item: string) => void;
  pinBoxBorderWidth: number;
  pinBoxGap?: number;
};

type ExtendedTextInput = TextInput & {
  focus?: (options?: { preventScroll?: boolean }) => void;
  scrollIntoView?: () => void;
  _node?: { scrollIntoView?: () => void };
};

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {
  const { colors } = useContext(ThemeContext);
  const {
    submitButtonIcon,
    submitButtonStyle,
    deleteButtonIcon,
    deleteButtonStyle,
    flatListProps,
    onKeyboardPress,
    typography,
    keyboardButtonRadius,
    keyboardButtonBorderColor,
    keyboardButtonBackgroundColor,
    keyboardStyle,
    buttonIconColor,
    contentContainerStyle,
    columnWrapperStyle,
    keyboardButtonSize,
    iconSize = 26,
  } = props;

  const _onKeyboardPress = (item: KeyboardItemProps) => () => {
    onKeyboardPress?.(item);
  };

  const renderIcon = (
    icon: React.ComponentProps<typeof CustomIcon>['icon'],
  ) => {
    return (
      <CustomIcon
        icon={icon}
        size={iconSize}
        color={buttonIconColor}
        crossOrigin='anonymous'
      />
    );
  };

  const _renderItem = ({ item }: { item: KeyboardItemProps }) => {
    const { backgroundColor, borderColor, borderRadius } =
      StyleSheet.flatten(keyboardStyle) || {};
    return (
      <ASButton
        style={{
          ...styles.keyboardButton,
          ...StyleSheet.flatten(keyboardStyle),
          borderColor: borderColor || keyboardButtonBorderColor,
          ...(item?.value === 'continue' &&
            StyleSheet.flatten(submitButtonStyle)),
          backgroundColor: backgroundColor || keyboardButtonBackgroundColor,
          ...(item?.value === 'delete' &&
            StyleSheet.flatten(deleteButtonStyle)),
          ...(item?.value === 'continue' &&
            StyleSheet.flatten(submitButtonStyle)),
          borderRadius: borderRadius || keyboardButtonRadius,
          ...(keyboardButtonSize && {
            width: keyboardButtonSize,
            height: keyboardButtonSize,
          }),
        }}
        onPress={_onKeyboardPress(item)}
      >
        {item?.value !== 'delete' && item?.value !== 'continue' && (
          <ASText style={[{ fontWeight: 'bold', fontSize: 18 }, typography]}>
            {item?.label}
          </ASText>
        )}
        {item?.value === 'delete' ? (
          deleteButtonIcon ? (
            renderIcon(deleteButtonIcon)
          ) : (
            <DeleteIcon color={buttonIconColor} size={iconSize} />
          )
        ) : null}
        {item?.value === 'continue' ? (
          submitButtonIcon ? (
            renderIcon(submitButtonIcon)
          ) : (
            <ForwardIcon color={buttonIconColor} size={iconSize} />
          )
        ) : null}
      </ASButton>
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      {...flatListProps}
      contentContainerStyle={[
        styles.flatListContainerStyles,
        StyleSheet.flatten(contentContainerStyle),
      ]}
      columnWrapperStyle={[
        styles.flatListColumnWrapperStyle,
        StyleSheet.flatten(columnWrapperStyle),
      ]}
      data={KEYBOARDS}
      renderItem={_renderItem}
      numColumns={3}
      keyExtractor={(item: KeyboardItemProps, index: number) =>
        `${item?.toString() + index}`
      }
    />
  );
};

const PinInputList: React.FC<PinInputListProps> = (
  props: PinInputListProps,
) => {
  const {
    pin,
    inputTypography,
    onKeyboardPress,
    enableNativeKeyboard,
    pinBoxRadius,
    pinBoxSize,
    pinBoxBackgroundColor,
    pinBoxBorderColor,
    onPress,
    pinBoxBorderWidth = 0,
    pinBoxGap,
  } = props;
  const PIN_SIZE = 50;
  const pinLength = props?.pinLength || 6;

  // References for each TextInput
  const inputRefs = useRef<TextInput[]>([]);

  // Override scrollIntoView on web to prevent auto-scroll
  useEffect(() => {
    if (Platform.OS === 'web' && enableNativeKeyboard) {
      inputRefs.current.forEach((input) => {
        if (input) {
          const element = input as ExtendedTextInput;
          if (element.scrollIntoView) {
            element.scrollIntoView = () => {}; // Override to do nothing
          }
          if (element._node?.scrollIntoView) {
            element._node.scrollIntoView = () => {}; // Override to do nothing
          }
        }
      });
    }
  }, [enableNativeKeyboard, pin]);

  const handleInputChange = (text: string, index: number) => {
    if (text) {
      // Update the pin state
      onKeyboardPress({ label: text, value: text });

      // Focus the next input if available
      if (index < pinLength - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          // On web, prevent scrollIntoView when focusing
          if (Platform.OS === 'web') {
            (nextInput as ExtendedTextInput)?.focus?.({ preventScroll: true });
          } else {
            nextInput.focus();
          }
        }
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData> & {
      preventDefault?: () => void;
    },
    index: number,
  ) => {
    const key = e.nativeEvent.key;

    if (key === 'Backspace') {
      if (!pin[index] && index > 0) {
        // If backspace is pressed and current input is empty, focus the previous input
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          if (Platform.OS === 'web') {
            (prevInput as ExtendedTextInput)?.focus?.({ preventScroll: true });
          } else {
            prevInput.focus();
          }
        }
      }
      onKeyboardPress({ label: 'delete', value: 'delete' });
    }

    if (key === 'Enter' || key === 'Submit') {
      // Prevent the keyboard from hiding
      e.preventDefault();

      // Focus the previous input if available
      if (index > 0) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          if (Platform.OS === 'web') {
            (prevInput as ExtendedTextInput)?.focus?.({ preventScroll: true });
          } else {
            prevInput.focus();
          }
        }
      }

      // You can also trigger the submit action if needed
      if (pin.length === pinLength) {
        //trigger submit
        onPress?.(pin.join(''));
      }
    }
  };

  const handleFocus = (
    e: NativeSyntheticEvent<TextInputFocusEventData> & {
      preventDefault?: () => void;
    },
    index: number,
  ) => {
    // Prevent auto-scroll on web
    if (Platform.OS === 'web') {
      // Prevent the default scroll-into-view behavior
      e?.preventDefault?.();

      // Keep resetting scroll position
      const resetScroll = () => {
        if (typeof window !== 'undefined') {
          const scrollX = window.scrollX || window.pageXOffset;
          if (scrollX !== 0) {
            window.scrollTo(0, window.scrollY || window.pageYOffset);
          }
        }
      };

      resetScroll();
      requestAnimationFrame(resetScroll);
      setTimeout(resetScroll, 0);
      setTimeout(resetScroll, 10);
    }
  };

  // Add effect to prevent scrolling on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const preventHorizontalScroll = () => {
        if (typeof window !== 'undefined') {
          const scrollX = window.scrollX || window.pageXOffset;
          if (scrollX !== 0) {
            window.scrollTo(0, window.scrollY || window.pageYOffset);
          }
        }
      };

      // Monitor for any scroll events
      window.addEventListener('scroll', preventHorizontalScroll);

      return () => {
        window.removeEventListener('scroll', preventHorizontalScroll);
      };
    }
  }, []);

  return (
    <ASRow
      style={{
        justifyContent: pinBoxGap ? 'flex-start' : 'space-between',
        ...(pinBoxGap !== undefined && { gap: pinBoxGap }),
      }}
    >
      {Array.from({ length: pinLength }, (_, index) => (
        <ASColumn
          key={index}
          style={[
            styles.pinItemWrapper,
            {
              borderColor: pinBoxBorderColor,
              backgroundColor: pinBoxBackgroundColor,
              width: pinBoxSize || PIN_SIZE,
              height: pinBoxSize || PIN_SIZE,
              borderRadius: pinBoxRadius,
              borderWidth: pinBoxBorderWidth,
            },
          ]}
        >
          {!enableNativeKeyboard ? (
            <ASText style={inputTypography}>{pin[index] || ''}</ASText>
          ) : (
            <TextInput
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
              style={[
                inputTypography,
                styles.textInputStyle,
                { width: pinBoxSize || PIN_SIZE },
              ]}
              value={pin[index] || ''}
              keyboardType='number-pad'
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={(e) => handleFocus(e, index)}
              maxLength={1}
              autoFocus={index === 0}
              caretHidden={true} // Hide caret (cursor)
              showSoftInputOnFocus={true} // Ensure the keyboard opens
              focusable={false} // Prevent focus by clicking
              selectTextOnFocus={false}
            />
          )}
        </ASColumn>
      ))}
    </ASRow>
  );
};

const ASPin: React.FC<ASPinProps> = (props: ASPinProps) => {
  const {
    submitButtonIcon,
    submitButtonStyle,
    deleteButtonIcon,
    deleteButtonStyle,
    flatListProps,
    pinLength = 6,
    onPress,
    children,
    onChange,
    keyboardTypography,
    inputTypography,
    gap,
    keyboardButtonRadius,
    enableNativeKeyboard,
    pinBoxRadius,
    pinBoxSize,
    keyboardButtonBackgroundColor,
    keyboardButtonBorderColor,
    pinBoxBackgroundColor,
    pinBoxBorderColor,
    isOverlayEnabled,
    keyboardStyle,
    name,
    style,
    buttonIconColor,
    contentContainerStyle,
    columnWrapperStyle,
    testId = 'ASPin',
    keyboardButtonSize,
    iconSize,
    pinBoxBorderWidth,
    pinBoxGap,
  } = props;
  const [pin, setPin] = useState<string[]>([]);
  const [field, meta, helpers] = useField<string>(name);
  const { setValue } = helpers || {};

  useEffect(() => {
    onChange?.(pin.join(''));
  }, [pin]);

  useEffect(() => {
    setValue?.(pin.join(''));
  }, [pin]);

  const onKeyboardItemPress = (item: KeyboardItemProps) => {
    if (item?.value === 'delete') {
      setPin((prevState: string[]) => {
        return prevState.slice(0, -1);
      });
    }

    if (item?.value === 'continue' && pin.length === pinLength) {
      const pinValue = pin.join('');
      onPress?.(pinValue);
      setValue?.(pinValue);
    }

    if (
      pin.length < pinLength &&
      item?.value !== 'delete' &&
      item?.value !== 'continue'
    ) {
      setPin((prevState: string[]) => {
        return [...prevState, item?.value];
      });
    }
  };

  return (
    <ASColumn
      style={[
        styles.flex1,
        !enableNativeKeyboard && { position: 'relative' },
        style,
      ]}
    >
      <View
        testID={`${testId}`}
        style={{
          marginBottom: gap || 24,
          width: '100%',
          ...(Platform.OS === 'web' && {
            position: 'relative',
            left: 0,
            transform: [{ translateX: 0 }],
          }),
        }}
      >
        <PinInputList
          pinLength={pinLength}
          pin={pin}
          inputTypography={inputTypography}
          onKeyboardPress={onKeyboardItemPress}
          enableNativeKeyboard={enableNativeKeyboard}
          pinBoxRadius={pinBoxRadius}
          pinBoxSize={pinBoxSize}
          pinBoxBackgroundColor={pinBoxBackgroundColor}
          pinBoxBorderColor={pinBoxBorderColor}
          onPress={onPress}
          pinBoxBorderWidth={pinBoxBorderWidth}
          pinBoxGap={pinBoxGap}
        />
      </View>

      {children}

      {!enableNativeKeyboard && (
        <Keyboard
          keyboardStyle={keyboardStyle}
          submitButtonIcon={submitButtonIcon}
          submitButtonStyle={submitButtonStyle}
          deleteButtonIcon={deleteButtonIcon}
          deleteButtonStyle={deleteButtonStyle}
          flatListProps={flatListProps}
          contentContainerStyle={contentContainerStyle}
          columnWrapperStyle={columnWrapperStyle}
          onKeyboardPress={onKeyboardItemPress}
          typography={keyboardTypography}
          keyboardButtonRadius={keyboardButtonRadius}
          keyboardButtonBackgroundColor={keyboardButtonBackgroundColor}
          keyboardButtonBorderColor={keyboardButtonBorderColor}
          buttonIconColor={buttonIconColor}
          keyboardButtonSize={keyboardButtonSize}
          iconSize={iconSize}
        />
      )}
      {isOverlayEnabled && <ASOverlay />}
    </ASColumn>
  );
};

export default ASPin;

const styles = StyleSheet.create({
  flex1: {
    width: '100%',
  },
  keyboardButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    height: 60,
  },
  pinItemWrapper: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textInputStyle: {
    textAlign: 'center',
    ...(Platform.OS === 'web' && {
      outline: 'none',
      userSelect: 'none',
    }),
  },
  flatListContainerStyles: { gap: 16, justifyContent: 'flex-end' },
  flatListColumnWrapperStyle: {
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
});
