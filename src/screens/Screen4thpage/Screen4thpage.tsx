import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text, color, component } from '@/assets';
import themeData from '@/assets/themeData';

import {
  ASContainer,
  ASStack,
  ASText,
  ASColumn,
  ASImage,
  ASButton,
  ASAppHeader,
} from '@/components';

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

const Screen4thpage: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressBacktomenubackToMenu = async () => {
    navigation.navigate(Route.SCREEN2NDPAGE, {});
  };

  useEffect(() => {
    navigation.setParams({
      headerActions: '',
    });
  }, [navigation]);

  return (
    <>
      <ASContainer
        isScrollable={true}
        disabledSafeArea={false}
        backgroundImageResizeMode={'contain'}
        name={'ASContainer-894214'}
        testID={'f145b21b-4956-4a56-9d0b-8fdfdd563c9f'}
        style={styles.aSContainerStyle}
        testId={'ASContainer-894214'}
      >
        <ASStack
          backgroundImageResizeMode={'contain'}
          name={'4th_page'}
          style={styles.as4thPageStyle}
          testId={'4th_page'}
        >
          <ASText
            numberOfLines={1}
            accessibilityLabel={'2 items in cart'}
            labelType={'string'}
            name={'2_items_in_cart'}
            style={[text.label.medium, styles.as2ItemsInCartStyle]}
            dragStyle={styles.as2ItemsInCartDragStyle}
            testId={'2_items_in_cart'}
          >
            {`2 items in cart`}
          </ASText>
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Ellipse_21'}
            style={styles.ellipse21Style}
            testId={'Ellipse_21'}
          />
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_42'}
            style={styles.rectangle42Style}
            testId={'Rectangle_42'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__ouwk}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'image_removebg_preview_5_1'}
              style={styles.imageRemovebgPreview51Style}
              hardCodeStyle={styles.imageRemovebgPreview51HardCodeStyle}
              testId={'image_removebg_preview_5_1'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_111'}
            style={styles.rectangle111Style}
            testId={'Rectangle_111'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__b55ho}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'image_removebg_preview_1_3'}
              style={styles.imageRemovebgPreview13Style}
              hardCodeStyle={styles.imageRemovebgPreview13HardCodeStyle}
              testId={'image_removebg_preview_1_3'}
            />
          </ASColumn>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Noodlos'}
            labelType={'string'}
            name={'Noodlos'}
            style={[text.label.medium, styles.noodlosStyle]}
            dragStyle={styles.noodlosDragStyle}
            testId={'Noodlos'}
          >
            {`Noodlos`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Boof Burger'}
            labelType={'string'}
            name={'Boof_Burger1'}
            style={[text.label.medium, styles.boofBurger1Style]}
            dragStyle={styles.boofBurger1DragStyle}
            testId={'Boof_Burger1'}
          >
            {`Boof Burger`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Order instsctions'}
            labelType={'string'}
            name={'Order_instsctions'}
            style={[text.label.medium, styles.orderInstsctionsStyle]}
            dragStyle={styles.orderInstsctionsDragStyle}
            testId={'Order_instsctions'}
          >
            {`Order instsctions`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Back to menu'}
            labelType={'string'}
            name={'Back_to_menu'}
            onPress={() => {
              onPressBacktomenubackToMenu({});
            }}
            style={[text.label.medium, styles.backToMenuStyle]}
            dragStyle={styles.backToMenuDragStyle}
            testId={'Back_to_menu'}
          >
            {`Back to menu`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Total'}
            labelType={'string'}
            name={'Total'}
            style={[text.label.medium, styles.totalStyle]}
            dragStyle={styles.totalDragStyle}
            testId={'Total'}
          >
            {`Total`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Free box of Fries'}
            labelType={'string'}
            name={'Free_box_of_Fries1'}
            style={[text.label.medium, styles.freeBoxOfFries1Style]}
            dragStyle={styles.freeBoxOfFries1DragStyle}
            testId={'Free_box_of_Fries1'}
          >
            {`Free box of Fries`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'$15'}
            labelType={'string'}
            name={'15'}
            style={[text.label.medium, styles.as15Style]}
            dragStyle={styles.as15DragStyle}
            testId={'15'}
          >
            {`$15`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'$20'}
            labelType={'string'}
            name={'201'}
            style={[text.label.medium, styles.as201Style]}
            dragStyle={styles.as201DragStyle}
            testId={'201'}
          >
            {`$20`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'$38'}
            labelType={'string'}
            name={'38'}
            style={[text.label.medium, styles.as38Style]}
            dragStyle={styles.as38DragStyle}
            testId={'38'}
          >
            {`$38`}
          </ASText>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'add_circle6'}
            style={styles.addCircle6Style}
            testId={'add_circle6'}
          >
            <ASImage
              source={imageSources.image__buoo1}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'add_circle7'}
              style={styles.addCircle7Style}
              hardCodeStyle={styles.addCircle7HardCodeStyle}
              testId={'add_circle7'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'add_circle8'}
            style={styles.addCircle8Style}
            testId={'add_circle8'}
          >
            <ASImage
              source={imageSources.image__meszj}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'add_circle9'}
              style={styles.addCircle9Style}
              hardCodeStyle={styles.addCircle9HardCodeStyle}
              testId={'add_circle9'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'do_not_disturb_on'}
            style={styles.doNotDisturbOnStyle}
            testId={'do_not_disturb_on'}
          >
            <ASImage
              source={imageSources.image__x8bs}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'do_not_disturb_on1'}
              style={styles.doNotDisturbOn1Style}
              hardCodeStyle={styles.doNotDisturbOn1HardCodeStyle}
              testId={'do_not_disturb_on1'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'do_not_disturb_on2'}
            style={styles.doNotDisturbOn2Style}
            testId={'do_not_disturb_on2'}
          >
            <ASImage
              source={imageSources.image__k5nko}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'do_not_disturb_on3'}
              style={styles.doNotDisturbOn3Style}
              hardCodeStyle={styles.doNotDisturbOn3HardCodeStyle}
              testId={'do_not_disturb_on3'}
            />
          </ASColumn>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'1'}
            labelType={'string'}
            name={'12'}
            style={[text.label.medium, styles.as12Style]}
            dragStyle={styles.as12DragStyle}
            testId={'12'}
          >
            {`1`}
          </ASText>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'1'}
            labelType={'string'}
            name={'13'}
            style={[text.label.medium, styles.as13Style]}
            dragStyle={styles.as13DragStyle}
            testId={'13'}
          >
            {`1`}
          </ASText>
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Ellipse_31'}
            style={styles.ellipse31Style}
            testId={'Ellipse_31'}
          >
            <ASText
              numberOfLines={1}
              accessibilityLabel={'2'}
              labelType={'string'}
              name={'2'}
              style={[text.label.medium, styles.as2Style]}
              dragStyle={styles.as2DragStyle}
              testId={'2'}
            >
              {`2`}
            </ASText>
          </ASContainer>
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Rectangle_15'}
            style={styles.rectangle15Style}
            testId={'Rectangle_15'}
          />
          <ASButton
            accessibilityLabel={'Checkout'}
            backgroundImageResizeMode={'contain'}
            simpleTextButton={false}
            iconPosition={'leading'}
            name={'Rectangle_16'}
            style={styles.rectangle16Style}
            textStyle={[text.label.medium, styles.rectangle16TextStyle]}
            leadingIconStyles={styles.rectangle16LeadingIconStyles}
            iconStyles={styles.rectangle16IconStyles}
            trailingIconStyles={styles.rectangle16TrailingIconStyles}
            label={'Checkout'}
            testId={'Rectangle_16'}
          />
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'nest_heat_link_e'}
            style={styles.nestHeatLinkEStyle}
            testId={'nest_heat_link_e'}
          >
            <ASImage
              source={imageSources.image__b0qg}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'nest_heat_link_e1'}
              style={styles.nestHeatLinkE1Style}
              hardCodeStyle={styles.nestHeatLinkE1HardCodeStyle}
              testId={'nest_heat_link_e1'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'nest_heat_link_e2'}
            style={styles.nestHeatLinkE2Style}
            testId={'nest_heat_link_e2'}
          >
            <ASImage
              source={imageSources.image__js3l0}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'nest_heat_link_e3'}
              style={styles.nestHeatLinkE3Style}
              hardCodeStyle={styles.nestHeatLinkE3HardCodeStyle}
              testId={'nest_heat_link_e3'}
            />
          </ASColumn>
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Rectangle_101'}
            style={styles.rectangle101Style}
            testId={'Rectangle_101'}
          />
        </ASStack>
      </ASContainer>
    </>
  );
};

const styles = StyleSheet.create({
  aSContainerStyle: {
    backgroundColor: '#ffffff',
    width: '100%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    height: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  as4thPageStyle: {
    shadowColor: 'rgba(0,0,0,0.25)',
    overflow: 'hidden',
    shadowRadius: 10.100000381469727,
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 50,
    opacity: 1,
    alignSelf: 'auto',
    position: 'relative',
    shadowOffset: { width: 12, height: 11 },
  },
  as2ItemsInCartStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '3.7%',
    left: '6.8%',
    color: '#141414',
    lineHeight: 38,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as2ItemsInCartDragStyle: { flexBasis: 'auto' },
  ellipse21Style: {
    width: 44,
    marginTop: -22,
    borderRadius: 22,
    marginLeft: -22,
    top: '5.8%',
    backgroundColor: '#d9d9d9',
    height: 44,
    position: 'absolute',
    left: '85.2%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  rectangle42Style: {
    left: '10.7%',
    position: 'absolute',
    borderRadius: 20,
    width: '29.3%',
    height: '15.3%',
    backgroundColor: '#f5e7ff',
    top: '11.8%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  imageRemovebgPreview51Style: {
    height: '79.5%',
    width: '89.9%',
    aspectRatio: 1,
    top: '14.4%',
    position: 'absolute',
    objectFit: 'cover',
    left: '3.9%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview51HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  rectangle111Style: {
    left: '10.5%',
    position: 'absolute',
    borderRadius: 20,
    width: '29.3%',
    height: '15.3%',
    backgroundColor: '#f5e7ff',
    top: '28.9%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  imageRemovebgPreview13Style: {
    height: '76.7%',
    width: '86.8%',
    aspectRatio: 1,
    top: '12.3%',
    position: 'absolute',
    objectFit: 'cover',
    left: '5.4%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview13HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  noodlosStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '12.8%',
    left: '34.3%',
    color: '#000000',
    lineHeight: 36,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 24,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  noodlosDragStyle: { flexBasis: 'auto' },
  boofBurger1Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '29.8%',
    left: '38.2%',
    color: '#000000',
    lineHeight: 36,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 24,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  boofBurger1DragStyle: { flexBasis: 'auto' },
  orderInstsctionsStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '48%',
    left: '3.9%',
    color: '#343434',
    lineHeight: 36,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 24,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  orderInstsctionsDragStyle: { flexBasis: 'auto' },
  backToMenuStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '81.9%',
    left: '30.5%',
    color: '#343434',
    lineHeight: 36,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 24,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  backToMenuDragStyle: { flexBasis: 'auto' },
  totalStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '64.3%',
    left: '-13.6%',
    color: '#343434',
    lineHeight: 36,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 24,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  totalDragStyle: { flexBasis: 'auto' },
  freeBoxOfFries1Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '45.6%',
    left: '5.9%',
    color: '#ffffff',
    lineHeight: 38,
    fontWeight: 700,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  freeBoxOfFries1DragStyle: { flexBasis: 'auto' },
  as15Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '17.4%',
    left: '28.9%',
    color: '#e09201',
    lineHeight: 38,
    fontWeight: 700,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as15DragStyle: { flexBasis: 'auto' },
  as201Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '34.4%',
    left: '28.6%',
    color: '#e09201',
    lineHeight: 38,
    fontWeight: 700,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as201DragStyle: { flexBasis: 'auto' },
  as38Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '63.3%',
    left: '65.9%',
    color: '#e09201',
    lineHeight: 38,
    fontWeight: 700,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as38DragStyle: { flexBasis: 'auto' },
  addCircle6Style: {
    left: '57.5%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '22.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  addCircle7Style: {
    height: 22,
    width: 22,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  addCircle7HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  addCircle8Style: {
    left: '57.3%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '39.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  addCircle9Style: {
    height: 22,
    width: 22,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  addCircle9HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  doNotDisturbOnStyle: {
    left: '44.3%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '22.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  doNotDisturbOn1Style: {
    height: 22,
    width: 22,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  doNotDisturbOn1HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  doNotDisturbOn2Style: {
    left: '44.1%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '39.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  doNotDisturbOn3Style: {
    height: 22,
    width: 22,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  doNotDisturbOn3HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  as12Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '22.2%',
    left: '52.5%',
    color: '#000000',
    lineHeight: 38,
    fontWeight: 500,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as12DragStyle: { flexBasis: 'auto' },
  as13Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '39.2%',
    left: '52.3%',
    color: '#000000',
    lineHeight: 38,
    fontWeight: 500,
    position: 'absolute',
    fontSize: 25,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as13DragStyle: { flexBasis: 'auto' },
  ellipse31Style: {
    width: 10,
    marginTop: -5,
    borderRadius: 5,
    marginLeft: -5,
    top: '90.6%',
    backgroundColor: '#8103db',
    height: 10,
    position: 'absolute',
    left: '62.9%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  as2Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '-10%',
    left: '20%',
    color: '#ffffff',
    lineHeight: 12,
    fontWeight: 400,
    position: 'absolute',
    fontSize: 8,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as2DragStyle: { flexBasis: 'auto' },
  rectangle15Style: {
    width: '84.3%',
    borderRadius: 20,
    top: '52.6%',
    borderWidth: 3,
    backgroundColor: '#ffffff',
    borderColor: '#a2a2a2',
    height: '7.8%',
    position: 'absolute',
    left: '7.3%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  rectangle16Style: {
    textAlign: 'center',
    lineHeight: 54,
    top: '70.2%',
    backgroundColor: '#5c2782',
    borderRadius: 20,
    position: 'absolute',
    height: '7.5%',
    width: '84.8%',
    left: '6.8%',
    opacity: 1,
    paddingTop: space['2'],
    paddingRight: space['3'],
    alignSelf: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: space['2'],
    paddingLeft: space['3'],
    alignContent: 'flex-start',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  rectangle16TextStyle: {
    fontSize: 36,
    fontFamily: 'Poppins',
    color: '#ffffff',
    fontWeight: 600,
  },
  rectangle16LeadingIconStyles: { marginRight: space['1'] },
  rectangle16IconStyles: {
    color: color.brand.onPrimary,
    iconSize: component.icon.size.md,
  },
  rectangle16TrailingIconStyles: { marginLeft: space['1'] },
  nestHeatLinkEStyle: {
    left: '86.6%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.7%',
    height: '2.6%',
    top: '13.3%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  nestHeatLinkE1Style: {
    height: 21,
    width: 21,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  nestHeatLinkE1HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  nestHeatLinkE2Style: {
    left: '86.6%',
    position: 'absolute',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.7%',
    height: '2.6%',
    top: '30.3%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  nestHeatLinkE3Style: {
    height: 21,
    width: 21,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  nestHeatLinkE3HardCodeStyle: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  rectangle101Style: {
    top: '89.7%',
    backgroundColor: '#ffffff',
    height: '10.9%',
    position: 'absolute',
    left: '2.5%',
    width: '100%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
});

export default Screen4thpage;
