import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import CustomIcon from '../CustomIcon';

export type ASListTileProps = {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  leadingIcon?: React.ReactNode | string;
  trailingIcon?: React.ReactNode | string;
  onPress?: () => void;
  testId?: string;
  style?: ViewStyle;
  leadingIconStyles?: ImageStyle;
  trailingIconStyles?: ImageStyle;
  titleStyles?: TextStyle;
  subTitleStyle?: TextStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  titleTypography?: TextStyle;
  subTitleTypography?: TextStyle;
  iconSize?: number;
};

const ASListTile: React.FC<ASListTileProps> = (props: ASListTileProps) => {
  const { colors } = useContext(ThemeContext);
  const {
    title,
    subtitle,
    style,
    leading,
    trailing,
    leadingIcon,
    trailingIcon,
    onPress,
    testId = 'ASListTile',
    leadingIconStyles,
    trailingIconStyles,
    titleStyles,
    titleStyle,
    subTitleStyle,
    subtitleStyle,
    titleTypography,
    subTitleTypography,
    iconSize,
  } = props;

  const resolvedLeading = leading || leadingIcon;
  const resolvedTrailing = trailing || trailingIcon;
  const resolvedTitleStyle = titleStyle || titleStyles;
  const resolvedSubtitleStyle = subtitleStyle || subTitleStyle;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        {resolvedLeading && (
          <View style={styles.leadingIcon}>
            {typeof resolvedLeading === 'string' ? (
              <CustomIcon
                icon={resolvedLeading}
                size={iconSize ?? leadingIconStyles?.iconSize}
                color={leadingIconStyles?.color as string}
                testId={`leadingIcon-${testId}`}
              />
            ) : (
              resolvedLeading
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleTypography, resolvedTitleStyle]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                subTitleTypography,
                resolvedSubtitleStyle,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {resolvedTrailing && (
          <View style={styles.trailingIcon}>
            {typeof resolvedTrailing === 'string' ? (
              <CustomIcon
                icon={resolvedTrailing}
                size={iconSize ?? trailingIconStyles?.iconSize}
                color={trailingIconStyles?.color as string}
                testId={`trailingIcon-${testId}`}
              />
            ) : (
              resolvedTrailing
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ASListTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {},
  leadingIcon: {},
  trailingIcon: {},
});

/*

                        <ASListTile title={item?.label} subtitle={item?.id}
                            leadingIcon={
                                <Icon name="user-circle-o"
                                      size={30}
                                      color="theme.colors.primaryIconColor"/>
                            }
                            trailingIcon={<Icon name="gear" size={30} color="theme.colors.primaryIconColor"/>}


                          <ASListView data={[{id: '1', label: 'Item 1'},
                        {id: '2', label: 'Item 2'},
                        {id: '3', label: 'Item 3'},]} renderItem={({item}) => (
                        <ASListTile title={item?.label} subtitle={item?.id}
                                    leadingIcon={
                                        <Icon name="user-circle-o"
                                              size={30}
                                              color="theme.colors.primaryIconColor"/>
                                    }
                                    trailingIcon={<Icon name="gear" size={30} color="theme.colors.primaryIconColor"/>}
                            />
                        )}/>
* */
