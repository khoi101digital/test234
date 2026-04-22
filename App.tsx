import React, { useEffect } from 'react';
import AppNavigator from '@/navigation/AppNavigator';
import { LogBox, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/navigation/NavigationService';
import SplashScreen from 'react-native-splash-screen';
import env from '@/env';
import { createAuthorizedApiClient } from '@/services/api-clients/AuthorizedApiClient';
import { AuthorizationClient } from '@/services/api-clients';
import { AppProviders } from '@/providers/AppProviders';
import { ASColumn, ASText, ASLoadingIndicator } from '@/components';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => SplashScreen?.hide(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProviders>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProviders>
  );
};

export default App;
