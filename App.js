import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contents/auth'
import Routes from './src/routes'
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#000" style={'light'}/> 
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
