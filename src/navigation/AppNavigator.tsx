import React, { useContext, useMemo } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from './routes';
import { ASBottomTabNavigator } from '@/components';
import { ThemeContext, useThemeColors } from '@/context';
import NavigationService from './NavigationService';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Fast2page from '@/screens/Fast2page/Fast2page';
import Fastpage from '@/screens/Fastpage/Fastpage';
import Screen3rdpage from '@/screens/Screen3rdpage/Screen3rdpage';
import Screen2ndpage from '@/screens/Screen2ndpage/Screen2ndpage';
import Screen4thpage from '@/screens/Screen4thpage/Screen4thpage';

const Stack = createStackNavigator();

export const defaultBackButton = (_navigation: {
  goBack: () => void;
}): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backIcon}
      onPress={() => {
        NavigationService.goBack();
      }}
    >
      <Ionicons name='arrow-back' size={24} color={color.brand.primary} />
    </TouchableOpacity>
  );
};

/**
 * AppNavigator component for managing navigation.
 * @param {{ navigation: { goBack: () => void } }} props - The navigation props.
 * @returns {JSX.Element} - The AppNavigator component.
 */
const AppNavigator = ({
  navigation,
}: {
  navigation: { goBack: () => void };
}): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Route.FAST2PAGE}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerLeft: (props) => defaultBackButton(navigation),
        headerTitle: '',
        presentation: 'modal',
        header: () => null,
      }}
    >
      <Stack.Screen
        name={Route.FAST2PAGE}
        component={Fast2page}
        options={({ route }) => ({})}
      />
      <Stack.Screen
        name={Route.FASTPAGE}
        component={Fastpage}
        options={({ route }) => ({})}
      />
      <Stack.Screen
        name={Route.SCREEN3RDPAGE}
        component={Screen3rdpage}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#49006d' },
        })}
      />
      <Stack.Screen
        name={Route.SCREEN2NDPAGE}
        component={Screen2ndpage}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#ffffff' },
        })}
      />
      <Stack.Screen
        name={Route.SCREEN4THPAGE}
        component={Screen4thpage}
        options={({ route }) => ({
          headerStyle: { backgroundColor: '#ffffff' },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    paddingHorizontal: 24,
  },
});

export default AppNavigator;
