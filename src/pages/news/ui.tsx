import {SafeView} from '@/shared/ui/safeView';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {$host} from '@/shared/api';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Container} from '@/shared/ui';
import {ROUTES} from '@/shared/router';
import {RefreshControl} from 'react-native-gesture-handler';
import {useTheme} from '@/shared/theme';
import IconPlus from '@assets/icons/Plus';

interface INewsCard {
  newsElement: any;
}

const NewsCard: React.FC<INewsCard> = ({newsElement}) => {
  const [opened, setOpened] = useState(false);
  return (
    <View style={styles.news_container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80',
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginLeft: 16,
            fontWeight: '500',
          }}>
          {newsElement.authorname}
        </Text>
      </View>
      <Text style={styles.news_text}>
        {newsElement.text.length > 200
          ? !opened
            ? newsElement.text.split(' ').slice(0, 20).join(' ') + '...'
            : newsElement.text
          : newsElement.text}
      </Text>
      <TouchableOpacity onPress={() => setOpened(state => !state)}>
        <Text style={{color: '#A4CE57', fontSize: 16, paddingBottom: 10}}>
          {!opened ? 'Читать далее' : 'Свернуть'}
        </Text>
      </TouchableOpacity>
      <Text style={{color: '#A7A9AB'}}>
        {new Intl.DateTimeFormat('ru-RU').format(
          new Date(newsElement.createdAt),
        )}
      </Text>
      {newsElement.image == null || newsElement.image.length < 10 ? null : (
        <Image
          style={{width: '100%', aspectRatio: '16/9', borderRadius: 5}}
          source={{uri: newsElement.image}}
        />
      )}
    </View>
  );
};

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  const fetch = async () => {
    const {data} = await $host.get('/feed/allposts');
    setNews(data.data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetch();
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch();
      setLoading(false);
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Container
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.header_text}>Новости</Text>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.6}
            onPress={() => navigation.navigate(ROUTES.CREATE_NEWS)}
            style={{
              width: 28,
              height: 28,
            }}>
            <IconPlus />
          </TouchableOpacity>
        </Container>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          position: 'relative',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size="large"
              color={theme.colors.green.primary}
            />
          </View>
        ) : (
          <Container
            style={{
              gap: 20,
            }}>
            {news.map((newsElement, i) => {
              return <NewsCard key={i} newsElement={newsElement} />;
            })}
          </Container>
        )}
      </ScrollView>
    </View>
  );
};
