import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { imageSources } from '@/assets';
import themeData from '@/assets/themeData';

import { ASContainer, ASImage, ASAppHeader } from '@/components';

import { Platform, StyleSheet } from 'react-native';

type FormValues = {
  [key: string]: unknown;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Fastpage: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

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
        name={'ASContainer-310884'}
        testID={'20febc5f-58b8-40ec-a7e8-6ba2ce26cbdb'}
        style={styles.aSContainerStyle}
        testId={'ASContainer-310884'}
      >
        <ASImage
          resizeMode={'cover'}
          source={imageSources.image__2jch}
          roundImageSize={0}
          resizeMethod={'auto'}
          name={'image_removebg_preview_6_1'}
          style={styles.imageRemovebgPreview61Style}
          hardCodeStyle={styles.imageRemovebgPreview61HardCodeStyle}
          testId={'image_removebg_preview_6_1'}
        />
      </ASContainer>
    </>
  );
};

const styles = StyleSheet.create({
  aSContainerStyle: {
    alignItems: 'center',
    paddingTop: 180,
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
  imageRemovebgPreview61Style: {
    height: 240,
    alignSelf: 'center',
    width: 240,
    aspectRatio: 1,
    objectFit: 'cover',
    flexBasis: 'auto',
    opacity: 1,
  },
  imageRemovebgPreview61HardCodeStyle: {
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

export default Fastpage;
