import React, { createContext, useCallback, useContext, useState } from 'react';

type GlobalData = Record<string, unknown>;

// Define the GlobalContextValue type
type GlobalContextValue = {
  setGlobalData: (data: GlobalData) => void;
  clearGlobalData: () => void;
  removeGlobalDataByKey: (key: string) => void;
  globalData: GlobalData;
};

// Initialize the GlobalContext with undefined
const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

// No default global data available
const defaultGlobalData = {};

// GlobalContextProvider component to wrap children
export const GlobalContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [globalData, _setGlobalData] = useState<GlobalData>(defaultGlobalData);

  // Function to set global data
  const setGlobalData = useCallback((obj: GlobalData) => {
    _setGlobalData((prev: GlobalData) => {
      return { ...prev, ...obj };
    });
  }, []);

  // Function to clear all global data
  const clearGlobalData = useCallback(() => {
    _setGlobalData({});
  }, []);

  // Function to remove a specific key from the global data
  const removeGlobalDataByKey = useCallback((key: string) => {
    _setGlobalData((prev: GlobalData) => {
      const { [key]: _, ...remainingData } = prev;
      return remainingData;
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        setGlobalData,
        clearGlobalData,
        removeGlobalDataByKey,
        globalData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};
