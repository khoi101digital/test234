import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

export const setKeychainData = async (key: string, data: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, data);
      return true;
    }
    await Keychain.setGenericPassword(key, data, { service: key });
    return true;
  } catch (error) {
    console.error('Error storing data in keychain:', error);
    return false;
  }
};

export const keychainData = async (key: string) => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key) || null;
    }
    const credentials = await Keychain.getGenericPassword({ service: key });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving data from keychain:', error);
    return null;
  }
};

export const removeKeychainData = async (key: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return true;
    }
    await Keychain.resetGenericPassword({ service: key });
    return true;
  } catch (error) {
    console.error('Error removing data from keychain:', error);
    return false;
  }
};
