import React, { useContext } from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

type DateTimePart = Intl.DateTimeFormatPart;
type LineType = 'ORDERED' | 'UNORDERED' | 'NONE';

export type ASTextProps = TextProps & {
  children?: string | undefined | number | React.ReactNode;
  style?: StyleProp<TextStyle>;
  labelType?: 'number' | 'datetime' | 'card-number' | 'expiry-date';
  label?: string;
  accessibilityLabel?: string;
  testId?: string;
  lineTypes?: LineType[];
  lineIndentations?: number[];
};

const ASText: React.FC<ASTextProps> = (props: ASTextProps) => {
  const { colors } = useContext(ThemeContext);
  const {
    children,
    labelType,
    label,
    testId = 'ASText',
    lineTypes,
    lineIndentations,
    ...restProps
  } = props || {};
  let labelValue =
    labelType === 'number' ? (children ?? label) : children || label;
  const style = StyleSheet.flatten(props?.style);

  //TODO: Remove this temeraly code and defnine this in DB
  if (
    labelType === 'number' &&
    labelValue !== '' &&
    labelValue !== null &&
    labelValue !== 'undefined' &&
    (typeof labelValue === 'string' || typeof labelValue === 'number')
  ) {
    //Format number 1234 -> 1,234.00
    labelValue = parseFloat(
      labelValue?.toString()?.replace(',', ''),
    ).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (labelType === 'datetime' && typeof labelValue === 'number') {
    // Format date from timestamp
    const date = new Date(labelValue);
    // Define options for formatting
    const options: { [key: string]: string } = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const parts = dateFormatter.formatToParts(date);
    // Construct the desired format from parts
    labelValue =
      `${parts?.find((part: DateTimePart) => part.type === 'weekday')?.value}, ` +
      `${parts?.find((part: DateTimePart) => part.type === 'day')?.value} ` +
      `${parts?.find((part: DateTimePart) => part.type === 'month')?.value} ` +
      `${parts?.find((part: DateTimePart) => part.type === 'year')?.value}`;
  } else if (
    labelType === 'expiry-date' &&
    labelValue !== '' &&
    labelValue !== null &&
    labelValue !== 'undefined' &&
    labelValue
  ) {
    // TODO: Remove this logic only for E6
    labelValue = `${labelValue?.toString().slice(4)}/${labelValue?.toString().slice(0, 4)}`;
  } else if (
    labelType === 'card-number' &&
    labelValue &&
    (typeof labelValue === 'string' || typeof labelValue === 'number')
  ) {
    let cardNumberString = labelValue?.toString();
    cardNumberString = cardNumberString?.toString()?.replace(/\D/g, '');
    labelValue = cardNumberString?.replace(/(.{4})/g, '$1 ').trim();
  } else {
    labelValue = `${labelValue?.toString()}`;
  }

  if (
    labelValue == null ||
    labelValue === 'undefined' ||
    labelValue === 'null' ||
    labelValue === undefined
  ) {
    return null;
  }

  if (lineTypes && lineTypes.length > 0 && typeof labelValue === 'string') {
    const lines = labelValue.split('\n');
    let orderedCounter = 0;
    return (
      <View testID={testId}>
        {lines.map((line, index) => {
          const lineType = lineTypes[index] ?? 'NONE';
          const indentation = lineIndentations?.[index] ?? 0;
          const indent = indentation * 16;
          let marker = '';
          if (lineType === 'UNORDERED') {
            marker = '\u2022 ';
            orderedCounter = 0;
          } else if (lineType === 'ORDERED') {
            orderedCounter += 1;
            marker = `${orderedCounter}. `;
          } else {
            orderedCounter = 0;
          }
          return (
            <Text
              key={index}
              {...restProps}
              style={[style, { paddingLeft: indent }]}
            >
              {marker}
              {line}
            </Text>
          );
        })}
      </View>
    );
  }

  return (
    <Text testID={testId} {...restProps} style={[style]}>
      {labelValue}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default ASText;
