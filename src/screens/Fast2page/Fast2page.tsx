import React, { useEffect, useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { color, space, text, border } from '@/assets';
import themeData from '@/assets/themeData';

import { ASContainer, ASRow, ASText, ASAppHeader } from '@/components';

import { Platform, StyleSheet } from 'react-native';

import Route from '@/navigation/routes';

type FormValues = {
  [key: string]: unknown;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Fast2page: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressRectangle1 = async () => {
    navigation.navigate(Route.SCREEN2NDPAGE, {});
  };

  useEffect(() => {
    navigation.setParams({
      headerActions: '',
    });
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <ASAppHeader
          styles={{
            paddingLeft: 8,
            backgroundColor: color.surface.default,
            height: 60,
            borderColor: color.border.default,
            paddingRight: 8,
          }}
          headerTitle={{
            title: '',
            alignment: 'left',
            textStyles: [text.title.medium, { flex: 1, textAlign: 'center' }],
          }}
          backButton={{
            isEnabled: false,
            icon: 'arrow_back',
            size: 24,
            isLargerBackButton: false,
            color: 'black',
            onPress: () => navigation.goBack(),
          }}
          actions={[
            {
              icon: 'https://content.oneapi.world/appbarIcon/action-5361aac2-6233-43ac-b3f7-6acfd8da638e-action-icon.png',
              iconSize: 289.6982624644493,
              alignment: 'right',
              color: '#000000',
              onPress: () => {},
            },
          ]}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <ASContainer
        isScrollable={true}
        disabledSafeArea={false}
        backgroundImageResizeMode={'contain'}
        name={'ASContainer-467059'}
        testID={'a6a77dc5-6102-4fbb-83f6-e71c48d04f9f'}
        style={styles.aSContainerStyle}
        testId={'ASContainer-467059'}
      >
        <ASRow
          backgroundImageResizeMode={'contain'}
          scrollable={false}
          scrollDirection={'horizontal'}
          spacing={space['2']}
          name={'fast_2_page_inferred_row_2'}
          style={styles.fast2PageInferredRow2Style}
          testId={'fast_2_page_inferred_row_2'}
        >
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Rectangle_1'}
            onPress={() => {
              onPressRectangle1({});
            }}
            style={styles.rectangle1Style}
            testId={'Rectangle_1'}
          />
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Get Started'}
            labelType={'string'}
            name={'Get_Started'}
            style={[text.label.medium, styles.getStartedStyle]}
            dragStyle={styles.getStartedDragStyle}
            testId={'Get_Started'}
          >
            {`Get Started`}
          </ASText>
        </ASRow>
      </ASContainer>
    </>
  );
};

const styles = StyleSheet.create({
  aSContainerStyle: {
    alignItems: 'center',
    paddingTop: 98,
    backgroundColor: '#49006d',
    paddingBottom: 0,
    width: '100%',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    height: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  fast2PageInferredRow2Style: {
    marginTop: 332,
    alignSelf: 'center',
    flexShrink: 1,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    overflow: 'visible',
    opacity: 1,
    alignContent: 'flex-start',
  },
  rectangle1Style: {
    shadowRadius: 6.699999809265137,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    height: 72,
    shadowColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    shadowOffset: { width: 4, height: 8 },
  },
  getStartedStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#570096',
    lineHeight: 54,
    fontWeight: 600,
    fontSize: 36,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  getStartedDragStyle: { flexBasis: 'auto' },
});

export default Fast2page;
