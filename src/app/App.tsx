import {useTheme} from '@/shared/theme';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import withProviders from './providers';
import {Router} from './routes';
import {useInit} from './useInit';

function App() {
  const loading = useInit();
  const theme = useTheme();

  if (loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.green.primary} />
    );
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Router />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default withProviders(App);
