import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text, color, component } from '@/assets';
import themeData from '@/assets/themeData';

import {
  ASContainer,
  ASStack,
  ASImage,
  ASRow,
  ASText,
  ASButton,
  ASColumn,
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

const Screen3rdpage: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressAddtoCartrectangle12 = async () => {
    navigation.navigate(Route.SCREEN4THPAGE, {});
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
        name={'ASContainer-331255'}
        testID={'daa0796e-4b34-4b90-92e8-d30471e639ac'}
        style={styles.aSContainerStyle}
        testId={'ASContainer-331255'}
      >
        <ASStack
          backgroundImageResizeMode={'contain'}
          name={'3rd_page'}
          style={styles.as3rdPageStyle}
          testId={'3rd_page'}
        >
          <ASContainer
            isScrollable={true}
            disabledSafeArea={false}
            backgroundImageResizeMode={'contain'}
            name={'Ellipse_1'}
            style={styles.ellipse1Style}
            testId={'Ellipse_1'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__v2kwv}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'image_removebg_preview_1_2'}
              style={styles.imageRemovebgPreview12Style}
              hardCodeStyle={styles.imageRemovebgPreview12HardCodeStyle}
              testId={'image_removebg_preview_1_2'}
            />
          </ASContainer>
          <ASRow
            backgroundImageResizeMode={'contain'}
            scrollable={false}
            scrollDirection={'horizontal'}
            spacing={space['2']}
            name={'Rectangle_11'}
            style={styles.rectangle11Style}
            testId={'Rectangle_11'}
          >
            <ASText
              numberOfLines={1}
              accessibilityLabel={'Boof Burger'}
              labelType={'string'}
              name={'Boof_Burger'}
              style={[text.label.medium, styles.boofBurgerStyle]}
              dragStyle={styles.boofBurgerDragStyle}
              testId={'Boof_Burger'}
            >
              {`Boof Burger`}
            </ASText>
            <ASText
              numberOfLines={1}
              accessibilityLabel={'1'}
              labelType={'string'}
              name={'1'}
              style={[text.label.medium, styles.as1Style]}
              dragStyle={styles.as1DragStyle}
              testId={'1'}
            >
              {`1`}
            </ASText>
            <ASText
              numberOfLines={2}
              accessibilityLabel={
                'Lorem ipsum dolor sit amet, consectetur adipiscing\\n elit, sed do eiusmod tempor incididunt'
              }
              labelType={'string'}
              name={
                'Lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_sed_do_eiusmod_tempor_incididunt'
              }
              style={[
                text.label.medium,
                styles.loremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntStyle,
              ]}
              dragStyle={
                styles.loremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntDragStyle
              }
              testId={
                'Lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_sed_do_eiusmod_tempor_incididunt'
              }
            >
              {`Lorem ipsum dolor sit amet, consectetur adipiscing\n elit, sed do eiusmod tempor incididunt`}
            </ASText>
          </ASRow>
          <ASButton
            accessibilityLabel={'Add to Cart'}
            backgroundImageResizeMode={'contain'}
            simpleTextButton={false}
            iconPosition={'leading'}
            name={'Rectangle_12'}
            onPress={() => {
              onPressAddtoCartrectangle12({});
            }}
            style={styles.rectangle12Style}
            textStyle={[text.label.medium, styles.rectangle12TextStyle]}
            leadingIconStyles={styles.rectangle12LeadingIconStyles}
            iconStyles={styles.rectangle12IconStyles}
            trailingIconStyles={styles.rectangle12TrailingIconStyles}
            label={'Add to Cart'}
            testId={'Rectangle_12'}
          />
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_121'}
            style={styles.rectangle121Style}
            testId={'Rectangle_121'}
          >
            <ASText
              numberOfLines={1}
              accessibilityLabel={'4.8'}
              labelType={'string'}
              name={'4_8'}
              style={[text.label.medium, styles.as48Style]}
              dragStyle={styles.as48DragStyle}
              testId={'4_8'}
            >
              {`4.8`}
            </ASText>
          </ASColumn>
          <ASText
            numberOfLines={1}
            accessibilityLabel={'Add Ons'}
            labelType={'string'}
            name={'Add_Ons'}
            style={[text.label.medium, styles.addOnsStyle]}
            dragStyle={styles.addOnsDragStyle}
            testId={'Add_Ons'}
          >
            {`Add Ons`}
          </ASText>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_4'}
            style={styles.rectangle4Style}
            testId={'Rectangle_4'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__f7bdm}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={
                'png_transparent_white_bread_bread_baked_goods_food_whole_grain_thumbnail_1'
              }
              style={
                styles.pngTransparentWhiteBreadBreadBakedGoodsFoodWholeGrainThumbnail1Style
              }
              hardCodeStyle={
                styles.pngTransparentWhiteBreadBreadBakedGoodsFoodWholeGrainThumbnail1HardCodeStyle
              }
              testId={
                'png_transparent_white_bread_bread_baked_goods_food_whole_grain_thumbnail_1'
              }
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_13'}
            style={styles.rectangle13Style}
            testId={'Rectangle_13'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__xt249}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'Pencicah_340KG_F_1'}
              style={styles.pencicah340KGF1Style}
              hardCodeStyle={styles.pencicah340KGF1HardCodeStyle}
              testId={'Pencicah_340KG_F_1'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'Rectangle_14'}
            style={styles.rectangle14Style}
            testId={'Rectangle_14'}
          >
            <ASImage
              resizeMode={'cover'}
              source={imageSources.image__ny4s}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={
                'homemade_tomato_lentil_soup_in_a_white_bowl_with_saucer_side_view_M6BM0X_1'
              }
              style={
                styles.homemadeTomatoLentilSoupInAWhiteBowlWithSaucerSideViewM6BM0X1Style
              }
              hardCodeStyle={
                styles.homemadeTomatoLentilSoupInAWhiteBowlWithSaucerSideViewM6BM0X1HardCodeStyle
              }
              testId={
                'homemade_tomato_lentil_soup_in_a_white_bowl_with_saucer_side_view_M6BM0X_1'
              }
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'add_circle'}
            style={styles.addCircleStyle}
            testId={'add_circle'}
          >
            <ASImage
              source={imageSources.image__dl5e}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'add_circle1'}
              style={styles.addCircle1Style}
              hardCodeStyle={styles.addCircle1HardCodeStyle}
              testId={'add_circle1'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'add_circle2'}
            style={styles.addCircle2Style}
            testId={'add_circle2'}
          >
            <ASImage
              source={imageSources.image__2ft9}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'add_circle3'}
              style={styles.addCircle3Style}
              hardCodeStyle={styles.addCircle3HardCodeStyle}
              testId={'add_circle3'}
            />
          </ASColumn>
          <ASColumn
            scrollable={false}
            backgroundImageResizeMode={'contain'}
            scrollDirection={'vertical'}
            spacing={space['2']}
            name={'add_circle4'}
            style={styles.addCircle4Style}
            testId={'add_circle4'}
          >
            <ASImage
              source={imageSources.image__9emr1}
              resizeMode={'contain'}
              roundImageSize={0}
              resizeMethod={'auto'}
              name={'add_circle5'}
              style={styles.addCircle5Style}
              hardCodeStyle={styles.addCircle5HardCodeStyle}
              testId={'add_circle5'}
            />
          </ASColumn>
        </ASStack>
      </ASContainer>
    </>
  );
};

const styles = StyleSheet.create({
  aSContainerStyle: {
    backgroundColor: '#49006d',
    width: '100%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    height: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  as3rdPageStyle: {
    shadowColor: 'rgba(0,0,0,0.25)',
    overflow: 'hidden',
    gradientEnd: { x: 0.03181826224138362, y: 1.000000021486591 },
    gradientColors: ['#49006d', '#a147e0'],
    gradientStart: { x: 0.5000000189390914, y: 0.014644354416702011 },
    shadowRadius: 10.100000381469727,
    gradientType: 'linear',
    width: '100%',
    backgroundColor: '#49006d',
    flex: 1,
    borderRadius: 50,
    gradientStops: [0, 1],
    opacity: 1,
    alignSelf: 'auto',
    position: 'relative',
    shadowOffset: { width: 12, height: 11 },
  },
  ellipse1Style: {
    width: 316,
    marginTop: -158,
    borderRadius: 158,
    marginLeft: -158,
    top: '24.8%',
    backgroundColor: 'rgba(240,240,240,0.566)',
    height: 316,
    position: 'absolute',
    left: '50%',
    alignItems: 'stretch',
    opacity: 1,
    alignSelf: 'auto',
    alignContent: 'flex-start',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  imageRemovebgPreview12Style: {
    height: '80.1%',
    width: '80.1%',
    aspectRatio: 1,
    top: '9.8%',
    position: 'absolute',
    objectFit: 'cover',
    left: '9.2%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview12HardCodeStyle: {
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
  rectangle11Style: {
    width: '100%',
    borderTopLeftRadius: 70,
    top: '44.6%',
    left: '0%',
    backgroundColor: '#ffffff',
    height: '56%',
    position: 'absolute',
    flexShrink: 1,
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    overflow: 'visible',
    opacity: 1,
    alignContent: 'flex-start',
  },
  boofBurgerStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '17.9%',
    left: '5.7%',
    color: '#141414',
    lineHeight: 41,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 27,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  boofBurgerDragStyle: { flexBasis: 'auto' },
  as1Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '18.7%',
    left: '82%',
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
  as1DragStyle: { flexBasis: 'auto' },
  loremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntStyle:
    {
      fontFamily: 'Poppins',
      width: '90.7%',
      top: '27.5%',
      left: '8.2%',
      color: '#5c5a5a',
      lineHeight: 21,
      fontWeight: 400,
      position: 'absolute',
      fontSize: 14,
      textAlign: 'left',
      textAlignVertical: 'auto',
      alignSelf: 'auto',
      overflow: 'visible',
      ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
    },
  loremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntDragStyle:
    { flexBasis: 'auto' },
  rectangle12Style: {
    textAlign: 'center',
    lineHeight: 54,
    top: '87.2%',
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
  rectangle12TextStyle: {
    fontSize: 36,
    fontFamily: 'Poppins',
    color: '#ffffff',
    fontWeight: 600,
  },
  rectangle12LeadingIconStyles: { marginRight: space['1'] },
  rectangle12IconStyles: {
    color: color.brand.onPrimary,
    iconSize: component.icon.size.md,
  },
  rectangle12TrailingIconStyles: { marginLeft: space['1'] },
  rectangle121Style: {
    left: '8.2%',
    position: 'absolute',
    borderRadius: 45,
    width: '24.5%',
    height: '5.1%',
    backgroundColor: '#6e3497',
    top: '47.6%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  as48Style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '6.1%',
    left: '28.7%',
    color: '#ffffff',
    lineHeight: 42,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 28,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  as48DragStyle: { flexBasis: 'auto' },
  addOnsStyle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    top: '67.6%',
    left: '-1.8%',
    color: '#141414',
    lineHeight: 33,
    fontWeight: 600,
    position: 'absolute',
    fontSize: 22,
    textAlignVertical: 'auto',
    alignSelf: 'auto',
    overflow: 'visible',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  addOnsDragStyle: { flexBasis: 'auto' },
  rectangle4Style: {
    left: '8.9%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '73.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  pngTransparentWhiteBreadBreadBakedGoodsFoodWholeGrainThumbnail1Style: {
    height: '55.4%',
    width: '86.3%',
    aspectRatio: 1.5,
    top: '22.9%',
    position: 'absolute',
    objectFit: 'cover',
    left: '2.5%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  pngTransparentWhiteBreadBreadBakedGoodsFoodWholeGrainThumbnail1HardCodeStyle:
    {
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
  rectangle13Style: {
    left: '39.8%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '73.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  pencicah340KGF1Style: {
    height: '85.5%',
    width: '60%',
    aspectRatio: 0.6761,
    top: '7.2%',
    position: 'absolute',
    objectFit: 'cover',
    left: '18.8%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  pencicah340KGF1HardCodeStyle: {
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
  rectangle14Style: {
    left: '69.1%',
    position: 'absolute',
    borderRadius: 20,
    width: '18.2%',
    height: '8.7%',
    backgroundColor: '#f1dcff',
    top: '73.7%',
    opacity: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    overflow: 'visible',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  homemadeTomatoLentilSoupInAWhiteBowlWithSaucerSideViewM6BM0X1Style: {
    height: '72.3%',
    width: '92.5%',
    aspectRatio: 1.2333,
    top: '15.7%',
    position: 'absolute',
    objectFit: 'cover',
    left: '1.3%',
    flexBasis: 'auto',
    alignSelf: 'auto',
    opacity: 1,
  },
  homemadeTomatoLentilSoupInAWhiteBowlWithSaucerSideViewM6BM0X1HardCodeStyle: {
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
  addCircleStyle: {
    left: '22.5%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '80.1%',
    opacity: 1,
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  addCircle1Style: {
    height: 21,
    width: 21,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  addCircle1HardCodeStyle: {
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
  addCircle2Style: {
    left: '53%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '80.1%',
    opacity: 1,
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  addCircle3Style: {
    height: 21,
    width: 21,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  addCircle3HardCodeStyle: {
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
  addCircle4Style: {
    left: '83.2%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    width: '5.9%',
    height: '2.7%',
    top: '80.1%',
    opacity: 1,
    alignSelf: 'auto',
    flexWrap: 'nowrap',
    flexShrink: 1,
    alignContent: 'flex-start',
  },
  addCircle5Style: {
    height: 21,
    width: 21,
    flexBasis: 'auto',
    alignSelf: 'auto',
    objectFit: 'contain',
    opacity: 1,
  },
  addCircle5HardCodeStyle: {
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
});

export default Screen3rdpage;
