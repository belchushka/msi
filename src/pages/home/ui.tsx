import {SafeView} from '@/shared/ui/safeView';
import React from 'react';
import {View, Text} from 'react-native';

export const HomePage = () => {
  return (
    <SafeView>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeView>
  );
};
