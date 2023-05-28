import { useTheme } from '@/shared/theme';
import React from 'react';
import {
  ActivityIndicator,
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import withProviders from './providers';
import { Router } from './routes';
import { useInit } from './useInit';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs()


function App() {
  const loading = useInit();
  const theme = useTheme();

  if (loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.green.primary} />
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Router />
      </SafeAreaView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default withProviders(App);
