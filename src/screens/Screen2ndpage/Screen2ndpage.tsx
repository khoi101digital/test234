import React, { useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  color,
  imageSources,
  space,
  text,
  radius,
  component,
  border,
} from '@/assets';
import themeData from '@/assets/themeData';

import {
  ASContainer,
  ASForm,
  ASStack,
  ASText,
  ASColumn,
  ASTextField,
  ASButton,
  ASPageView,
  ASImage,
  ASAppHeader,
} from '@/components';

import { Platform, StyleSheet } from 'react-native';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';

type FormValues = {
  Rectangle_2?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Screen2ndpage: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const navigation = useNavigation();

  const onPressEllipse2 = async () => {
    navigation.navigate(Route.FAST2PAGE, {});
  };

  const onPressBoofBurgerrectangle8 = async () => {
    navigation.navigate(Route.SCREEN3RDPAGE, {});
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
        name={'ASContainer-372355'}
        testID={'aabcf61c-41c6-47db-b45b-1bfec17b7d61'}
        style={styles.aSContainerStyle}
        testId={'ASContainer-372355'}
      >
        <ASForm
          enableReinitialize={true}
          name={'ASForm-815185'}
          validationSchema={Yup.object().shape({})}
          initialValues={{ Rectangle_2: '' }}
          innerRef={formikRef}
          testId={'ASForm-815185'}
        >
          {(formikProps: FormikProps<FormValues>) => {
            const { values, handleSubmit, setFieldValue } = formikProps;
            return (
              <>
                <ASStack
                  backgroundImageResizeMode={'contain'}
                  name={'2nd_page'}
                  style={styles.as2ndPageStyle}
                  testId={'2nd_page'}
                >
                  <ASContainer
                    isScrollable={true}
                    disabledSafeArea={false}
                    backgroundImageResizeMode={'contain'}
                    name={'Rectangle_10'}
                    style={styles.rectangle10Style}
                    testId={'Rectangle_10'}
                  />
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Menu'}
                    labelType={'string'}
                    name={'Menu'}
                    style={[text.label.medium, styles.menuStyle]}
                    dragStyle={styles.menuDragStyle}
                    testId={'Menu'}
                  >
                    {`Menu`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Promation'}
                    labelType={'string'}
                    name={'Promation'}
                    style={[text.label.medium, styles.promationStyle]}
                    dragStyle={styles.promationDragStyle}
                    testId={'Promation'}
                  >
                    {`Promation`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Populor'}
                    labelType={'string'}
                    name={'Populor'}
                    style={[text.label.medium, styles.populorStyle]}
                    dragStyle={styles.populorDragStyle}
                    testId={'Populor'}
                  >
                    {`Populor`}
                  </ASText>
                  <ASContainer
                    isScrollable={true}
                    disabledSafeArea={false}
                    backgroundImageResizeMode={'contain'}
                    name={'Ellipse_2'}
                    onPress={() => {
                      onPressEllipse2({});
                    }}
                    style={styles.ellipse2Style}
                    testId={'Ellipse_2'}
                  />
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'Rectangle_2_position_wrapper'}
                    style={styles.rectangle2PositionWrapperStyle}
                    testId={'Rectangle_2_position_wrapper'}
                  >
                    <ASTextField
                      placeholderTextColor={color.text.tertiary}
                      borderActiveColor={color.brand.primary}
                      borderErrorColor={color.status.danger}
                      placeholder={'Search'}
                      name={'Rectangle_2'}
                      textFieldType={'custom'}
                      autoComplete={'off'}
                      maxNumberOfLines={5}
                      allowFontScaling={false}
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      inputTextStyle={[
                        text.body.medium,
                        styles.rectangle2InputTextStyle,
                      ]}
                      placeholderTextStyle={
                        styles.rectangle2PlaceholderTextStyle
                      }
                      containerStyle={styles.rectangle2ContainerStyle}
                      labelTextStyle={[
                        text.label.medium,
                        styles.rectangle2LabelTextStyle,
                      ]}
                      errorMessageTextStyle={[
                        text.label.small,
                        styles.rectangle2ErrorMessageTextStyle,
                      ]}
                      style={styles.rectangle2Style}
                      prefixTextStyle={[
                        text.body.medium,
                        styles.rectangle2PrefixTextStyle,
                      ]}
                      contentContainerStyle={
                        styles.rectangle2ContentContainerStyle
                      }
                      suffixIconStyles={styles.rectangle2SuffixIconStyles}
                      prefixIconStyles={styles.rectangle2PrefixIconStyles}
                      testId={'Rectangle_2'}
                    />
                  </ASColumn>
                  <ASContainer
                    isScrollable={true}
                    disabledSafeArea={false}
                    backgroundImageResizeMode={'contain'}
                    name={'Rectangle_3'}
                    style={styles.rectangle3Style}
                    testId={'Rectangle_3'}
                  />
                  <ASButton
                    accessibilityLabel={
                      'Today’s Offer on all orders above $150'
                    }
                    backgroundImageResizeMode={'contain'}
                    simpleTextButton={false}
                    iconPosition={'leading'}
                    name={'Rectangle_7'}
                    style={styles.rectangle7Style}
                    textStyle={[text.label.medium, styles.rectangle7TextStyle]}
                    leadingIconStyles={styles.rectangle7LeadingIconStyles}
                    iconStyles={styles.rectangle7IconStyles}
                    trailingIconStyles={styles.rectangle7TrailingIconStyles}
                    label={'Today’s Offer on all orders above $150'}
                    testId={'Rectangle_7'}
                  />
                  <ASButton
                    accessibilityLabel={'Boof Burger'}
                    icon={
                      'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c6a6488c-6344-4200-8510-620506b8b241'
                    }
                    backgroundImageResizeMode={'contain'}
                    simpleTextButton={false}
                    iconPosition={'leading'}
                    name={'Rectangle_8'}
                    onPress={() => {
                      onPressBoofBurgerrectangle8({});
                    }}
                    style={styles.rectangle8Style}
                    textStyle={[text.label.medium, styles.rectangle8TextStyle]}
                    iconStyles={styles.rectangle8IconStyles}
                    leadingIconStyles={styles.rectangle8LeadingIconStyles}
                    trailingIconStyles={styles.rectangle8TrailingIconStyles}
                    label={'Boof Burger'}
                    testId={'Rectangle_8'}
                  />
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'Rectangle_9_position_wrapper'}
                    style={styles.rectangle9PositionWrapperStyle}
                    testId={'Rectangle_9_position_wrapper'}
                  >
                    <ASPageView
                      inactiveDotColor={color.surface.background}
                      paginationBottomPosition={0}
                      activeDotColor={color.brand.primary}
                      showsVerticalScrollIndicator={false}
                      expansionFactor={1}
                      axis={'horizontal'}
                      snapToAlignment={'center'}
                      showDotsIndicator={true}
                      dotsIndicatorPosition={'bottom-center'}
                      showsHorizontalScrollIndicator={false}
                      name={'Rectangle_9'}
                      style={styles.rectangle9Style}
                      dotsIndicatorStyles={styles.rectangle9DotsIndicatorStyles}
                      testId={'Rectangle_9'}
                    >
                      <ASImage
                        resizeMode={'cover'}
                        source={imageSources.image__oh63}
                        roundImageSize={0}
                        resizeMethod={'auto'}
                        name={'1480972867043_1'}
                        style={styles.as14809728670431Style}
                        hardCodeStyle={styles.as14809728670431HardCodeStyle}
                        testId={'1480972867043_1'}
                      />
                      <ASText
                        numberOfLines={1}
                        accessibilityLabel={'Chooso Pizza'}
                        labelType={'string'}
                        name={'Chooso_Pizza'}
                        style={[text.label.medium, styles.choosoPizzaStyle]}
                        dragStyle={styles.choosoPizzaDragStyle}
                        testId={'Chooso_Pizza'}
                      >
                        {`Chooso Pizza`}
                      </ASText>
                    </ASPageView>
                  </ASColumn>
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'Rectangle_41'}
                    style={styles.rectangle41Style}
                    testId={'Rectangle_41'}
                  >
                    <ASImage
                      resizeMode={'cover'}
                      source={imageSources.image__xcja}
                      roundImageSize={0}
                      resizeMethod={'auto'}
                      name={'image_removebg_preview_1_1'}
                      style={styles.imageRemovebgPreview11Style}
                      hardCodeStyle={styles.imageRemovebgPreview11HardCodeStyle}
                      testId={'image_removebg_preview_1_1'}
                    />
                  </ASColumn>
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'Rectangle_5'}
                    style={styles.rectangle5Style}
                    testId={'Rectangle_5'}
                  >
                    <ASImage
                      resizeMode={'cover'}
                      source={imageSources.image__4hfc}
                      roundImageSize={0}
                      resizeMethod={'auto'}
                      name={'image_removebg_preview_2_1'}
                      style={styles.imageRemovebgPreview21Style}
                      hardCodeStyle={styles.imageRemovebgPreview21HardCodeStyle}
                      testId={'image_removebg_preview_2_1'}
                    />
                  </ASColumn>
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'Rectangle_6'}
                    style={styles.rectangle6Style}
                    testId={'Rectangle_6'}
                  >
                    <ASImage
                      resizeMode={'cover'}
                      source={imageSources.image__dqc0}
                      roundImageSize={0}
                      resizeMethod={'auto'}
                      name={'image_removebg_preview_3_1'}
                      style={styles.imageRemovebgPreview31Style}
                      hardCodeStyle={styles.imageRemovebgPreview31HardCodeStyle}
                      testId={'image_removebg_preview_3_1'}
                    />
                  </ASColumn>
                  <ASImage
                    resizeMode={'cover'}
                    source={imageSources.image__tofdr}
                    roundImageSize={0}
                    resizeMethod={'auto'}
                    name={'image_removebg_preview_1'}
                    style={styles.imageRemovebgPreview1Style}
                    hardCodeStyle={styles.imageRemovebgPreview1HardCodeStyle}
                    testId={'image_removebg_preview_1'}
                  />
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'All'}
                    labelType={'string'}
                    name={'All'}
                    style={[text.label.medium, styles.allStyle]}
                    dragStyle={styles.allDragStyle}
                    testId={'All'}
                  >
                    {`All`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Burger'}
                    labelType={'string'}
                    name={'Burger'}
                    style={[text.label.medium, styles.burgerStyle]}
                    dragStyle={styles.burgerDragStyle}
                    testId={'Burger'}
                  >
                    {`Burger`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Pizza'}
                    labelType={'string'}
                    name={'Pizza'}
                    style={[text.label.medium, styles.pizzaStyle]}
                    dragStyle={styles.pizzaDragStyle}
                    testId={'Pizza'}
                  >
                    {`Pizza`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Dessert'}
                    labelType={'string'}
                    name={'Dessert'}
                    style={[text.label.medium, styles.dessertStyle]}
                    dragStyle={styles.dessertDragStyle}
                    testId={'Dessert'}
                  >
                    {`Dessert`}
                  </ASText>
                  <ASImage
                    resizeMode={'cover'}
                    source={imageSources.image__k10vh}
                    roundImageSize={0}
                    resizeMethod={'auto'}
                    name={'bakery_biscuits_1'}
                    style={styles.bakeryBiscuits1Style}
                    hardCodeStyle={styles.bakeryBiscuits1HardCodeStyle}
                    testId={'bakery_biscuits_1'}
                  />
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'Free box of Fries'}
                    labelType={'string'}
                    name={'Free_box_of_Fries'}
                    style={[text.label.medium, styles.freeBoxOfFriesStyle]}
                    dragStyle={styles.freeBoxOfFriesDragStyle}
                    testId={'Free_box_of_Fries'}
                  >
                    {`Free box of Fries`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'$20'}
                    labelType={'string'}
                    name={'20'}
                    style={[text.label.medium, styles.as20Style]}
                    dragStyle={styles.as20DragStyle}
                    testId={'20'}
                  >
                    {`$20`}
                  </ASText>
                  <ASText
                    numberOfLines={1}
                    accessibilityLabel={'$32'}
                    labelType={'string'}
                    name={'32'}
                    style={[text.label.medium, styles.as32Style]}
                    dragStyle={styles.as32DragStyle}
                    testId={'32'}
                  >
                    {`$32`}
                  </ASText>
                  <ASColumn
                    scrollable={false}
                    backgroundImageResizeMode={'contain'}
                    scrollDirection={'vertical'}
                    spacing={space['2']}
                    name={'home'}
                    style={styles.homeStyle}
                    testId={'home'}
                  >
                    <ASImage
                      source={imageSources.image__mh03}
                      resizeMode={'contain'}
                      roundImageSize={0}
                      resizeMethod={'auto'}
                      name={'home1'}
                      style={styles.home1Style}
                      hardCodeStyle={styles.home1HardCodeStyle}
                      testId={'home1'}
                    />
                  </ASColumn>
                  <ASContainer
                    isScrollable={true}
                    disabledSafeArea={false}
                    backgroundImageResizeMode={'contain'}
                    name={'Ellipse_3'}
                    style={styles.ellipse3Style}
                    testId={'Ellipse_3'}
                  >
                    <ASText
                      numberOfLines={1}
                      accessibilityLabel={'1'}
                      labelType={'string'}
                      name={'11'}
                      style={[text.label.medium, styles.as11Style]}
                      dragStyle={styles.as11DragStyle}
                      testId={'11'}
                    >
                      {`1`}
                    </ASText>
                  </ASContainer>
                </ASStack>
              </>
            );
          }}
        </ASForm>
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
  as2ndPageStyle: {
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
  rectangle10Style: {
    top: '90.2%',
    backgroundColor: '#ffffff',
    height: '10.9%',
    position: 'absolute',
    left: '-2.3%',
    width: '100%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  menuStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '1.9%',
    left: '6.8%',
    color: '#141414',
    lineHeight: 72,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 48,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  menuDragStyle: { flexBasis: 'auto' },
  promationStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '37%',
    left: '8.4%',
    color: '#141414',
    lineHeight: 42,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 28,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  promationDragStyle: { flexBasis: 'auto' },
  populorStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '59.5%',
    left: '3.9%',
    color: '#141414',
    lineHeight: 42,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 28,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  populorDragStyle: { flexBasis: 'auto' },
  ellipse2Style: {
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
  rectangle2PositionWrapperStyle: {
    left: '7.7%',
    position: 'absolute',
    width: '84.8%',
    height: '5.8%',
    top: '11.2%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  rectangle2InputTextStyle: {
    fontFamily: 'Poppins',
    height: '100%',
    color: color.text.primary,
    textAlign: 'left',
  },
  rectangle2PlaceholderTextStyle: { fontFamily: 'Poppins' },
  rectangle2ContainerStyle: { borderRadius: 33, backgroundColor: '#f3f3f3' },
  rectangle2LabelTextStyle: {
    fontFamily: 'Poppins',
    position: 'absolute',
    maxWidth: '97%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  rectangle2ErrorMessageTextStyle: { color: color.status.danger },
  rectangle2Style: {
    height: component.input.height,
    paddingRight: space['3'],
    borderRadius: radius.sm,
    backgroundColor: color.surface.default,
    alignSelf: 'auto',
    width: '100%',
    borderWidth: border.default,
    borderColor: color.border.default,
    paddingLeft: space['3'],
  },
  rectangle2PrefixTextStyle: {},
  rectangle2ContentContainerStyle: {
    gap: space['2'],
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rectangle2SuffixIconStyles: { iconSize: 22, color: color.text.primary },
  rectangle2PrefixIconStyles: { iconSize: 22, color: color.text.primary },
  rectangle3Style: {
    width: '18.2%',
    borderRadius: 20,
    top: '19.8%',
    backgroundColor: '#570096',
    height: '8.7%',
    position: 'absolute',
    left: '8.6%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  rectangle7Style: {
    gradientType: 'linear',
    borderColor: '#9e1ef7',
    textAlign: 'center',
    gradientEnd: { x: 0.8602739382641337, y: 1.000000062200141 },
    gradientStart: { x: 0.4999999701976776, y: 6.191295653934503e-8 },
    gradientColors: ['#ad55ec', '#c486f1'],
    lineHeight: 30,
    gradientStops: [0, 1],
    top: '42.3%',
    backgroundColor: '#ad55ec',
    borderRadius: 20,
    position: 'absolute',
    height: '15.9%',
    width: '83%',
    borderWidth: 3,
    left: '8.6%',
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
  rectangle7TextStyle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: '#ffffff',
    fontWeight: 600,
  },
  rectangle7LeadingIconStyles: { marginRight: space['1'] },
  rectangle7IconStyles: {
    color: color.brand.onPrimary,
    iconSize: component.icon.size.md,
  },
  rectangle7TrailingIconStyles: { marginLeft: space['1'] },
  rectangle8Style: {
    gradientType: 'linear',
    textAlign: 'center',
    gradientEnd: { x: 0.8602739382641337, y: 1.000000062200141 },
    gradientStart: { x: 0.4999999701976776, y: 6.191295653934503e-8 },
    gradientColors: ['#efdaff', '#f1dffe'],
    lineHeight: 27,
    gradientStops: [0, 1],
    top: '64.9%',
    backgroundColor: '#efdaff',
    borderRadius: 20,
    position: 'absolute',
    height: '22.4%',
    width: '39.1%',
    left: '8.2%',
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
  rectangle8TextStyle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#141414',
    fontWeight: 600,
  },
  rectangle8IconStyles: { iconSize: 129, color: color.brand.onPrimary },
  rectangle8LeadingIconStyles: { marginRight: space['1'] },
  rectangle8TrailingIconStyles: { marginLeft: space['1'] },
  rectangle9PositionWrapperStyle: {
    left: '52.3%',
    position: 'absolute',
    width: '39.1%',
    height: '22.4%',
    top: '64.9%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  rectangle9Style: {
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'auto',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  rectangle9DotsIndicatorStyles: {
    justifyContent: 'center',
    gap: space['2'],
    borderRadius: radius.sm,
    alignItems: 'center',
    ...Platform.select({
      web: { display: 'flex', cursor: 'pointer' },
      default: {},
    }),
  },
  as14809728670431Style: {
    height: '52.3%',
    width: '87.2%',
    aspectRatio: 1.3393,
    top: '9.3%',
    position: 'absolute',
    objectFit: 'cover',
    left: '4.1%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  as14809728670431HardCodeStyle: {
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
  choosoPizzaStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '62.6%',
    left: '-0.6%',
    color: '#141414',
    lineHeight: 27,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 18,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  choosoPizzaDragStyle: { flexBasis: 'auto' },
  rectangle41Style: {
    left: '30.9%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '19.8%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  imageRemovebgPreview11Style: {
    height: '79.5%',
    width: '82.5%',
    aspectRatio: 1,
    top: '9.6%',
    position: 'absolute',
    objectFit: 'cover',
    left: '7.5%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview11HardCodeStyle: {
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
  rectangle5Style: {
    left: '52.7%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '19.8%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  imageRemovebgPreview21Style: {
    height: '63.9%',
    width: '88.8%',
    aspectRatio: 1.3396,
    top: '16.9%',
    position: 'absolute',
    objectFit: 'cover',
    left: '7.5%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview21HardCodeStyle: {
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
  rectangle6Style: {
    left: '74.3%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '19.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  imageRemovebgPreview31Style: {
    height: '48.2%',
    width: '75%',
    aspectRatio: 1.5,
    top: '20.5%',
    position: 'absolute',
    objectFit: 'cover',
    left: '12.5%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview31HardCodeStyle: {
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
  imageRemovebgPreview1Style: {
    height: '6.9%',
    width: '18.8%',
    aspectRatio: 1.2546,
    top: '20.5%',
    position: 'absolute',
    objectFit: 'cover',
    left: '9.5%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview1HardCodeStyle: {
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
  allStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '30.5%',
    left: '8.6%',
    color: '#440472',
    lineHeight: 27,
    fontWeight: 400,
    position: 'absolute',
    fontSize: 18,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  allDragStyle: { flexBasis: 'auto' },
  burgerStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '30.5%',
    left: '32.3%',
    color: '#000000',
    lineHeight: 27,
    fontWeight: 400,
    position: 'absolute',
    fontSize: 18,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  burgerDragStyle: { flexBasis: 'auto' },
  pizzaStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '30.5%',
    left: '55.5%',
    color: '#000000',
    lineHeight: 27,
    fontWeight: 400,
    position: 'absolute',
    fontSize: 18,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  pizzaDragStyle: { flexBasis: 'auto' },
  dessertStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '30.5%',
    left: '77%',
    color: '#000000',
    lineHeight: 27,
    fontWeight: 400,
    position: 'absolute',
    fontSize: 18,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  dessertDragStyle: { flexBasis: 'auto' },
  bakeryBiscuits1Style: {
    height: '19.9%',
    width: '43.2%',
    aspectRatio: 1,
    top: '33.2%',
    position: 'absolute',
    objectFit: 'cover',
    left: '52.7%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  bakeryBiscuits1HardCodeStyle: {
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
  freeBoxOfFriesStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '47.6%',
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
  freeBoxOfFriesDragStyle: { flexBasis: 'auto' },
  as20Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '81.6%',
    left: '6.6%',
    color: '#e09201',
    lineHeight: 30,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 20,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as20DragStyle: { flexBasis: 'auto' },
  as32Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '82%',
    left: '50%',
    color: '#e09201',
    lineHeight: 30,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 20,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as32DragStyle: { flexBasis: 'auto' },
  homeStyle: {
    left: '10.7%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '8.4%',
    height: '3.9%',
    top: '91.9%',
    opacity: 1,
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  home1Style: {
    height: 28,
    width: 25,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  home1HardCodeStyle: {
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
  ellipse3Style: {
    width: 10,
    marginTop: -5,
    borderRadius: 5,
    marginLeft: -5,
    top: '91.8%',
    backgroundColor: '#99989a',
    height: 10,
    position: 'absolute',
    left: '64.5%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  as11Style: {
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
  as11DragStyle: { flexBasis: 'auto' },
});

export default Screen2ndpage;
