import {useTheme} from '@/shared/theme';
import React from 'react';
import {
  ActivityIndicator,
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import withProviders from './providers';
import {Router} from './routes';
import {useInit} from './useInit';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

function App() {
  const loading = useInit();
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{flex: 1, position: 'relative'}}>
      {loading && (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 1000,
          }}>
          <ActivityIndicator size="large" color={theme.colors.green.primary} />
        </View>
      )}
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
