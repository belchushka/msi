import React, {useState} from 'react';
import styles from './styles';
import {ActivityIndicator, Linking, Text, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import {Button} from '@/shared/ui';
import {ResizeMode, Video} from 'expo-av';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@/shared/theme';

export const LessonPage = ({route}) => {
  const params = route.params;
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <SafeView style={{flex: 1}}>
      <View style={styles.top}>
        {loading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: '50%',
              alignSelf: 'center',
            }}
            size="large"
            color={theme.colors.green.primary}
          />
        )}
        <Video
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onError={console.log}
          source={{uri: params.lession?.lessions[0]?.url}}
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.status}>Пройдено</Text>
        <Text style={styles.header}>{params.lession.title}</Text>
        <Text style={styles.description}>{params.lession.description}</Text>
        <Button
          onPress={() => Linking.openURL(params.lession?.lessions[0]?.url)}
          style={{justifyContent: 'flex-end', marginTop: 24}}
          variant="outline_green">
          Скачать материалы
        </Button>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          style={{justifyContent: 'flex-end', marginTop: 12}}
          variant="primary">
          К списку уроков
        </Button>
      </View>
    </SafeView>
  );
};
