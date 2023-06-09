import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {$authHost, $host} from '@/shared/api';
import DefaultPicture from '@assets/images/default_userpicture.png';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Button, Container} from '@/shared/ui';
import {ROUTES} from '@/shared/router';
import {RefreshControl} from 'react-native-gesture-handler';
import {useTheme} from '@/shared/theme';
import IconPlus from '@assets/icons/Plus';
import Like from '@assets/images/heart.png';
import LikeFilled from '@assets/images/heart_filled.png';
import Share from '@assets/images/share.png';

interface INewsCard {
  newsElement: any;
}

const NewsCard: React.FC<INewsCard> = ({newsElement}) => {
  const [opened, setOpened] = useState(false);
  const [liked, setLiked] = useState(false);

  const onLike = async (liked: boolean) => {
    try {
      const resp = await $authHost.put('feed/updatelike', {
        postid: parseInt(newsElement.id),
        isLike: liked ? 'true' : 'false',
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <View style={styles.news_container}>
      {
        <Text style={{fontFamily: 'DeeDee', fontSize: 20, color: 'black'}}>
          {newsElement.badge[0]}
        </Text>
      }
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={
            newsElement?.user?.photo
              ? {
                  uri: newsElement.user.photo,
                }
              : DefaultPicture
          }
        />
        <View style={{marginLeft: 16, gap: 2}}>
          <Text
            style={{
              fontFamily: 'DeeDee',
              color: 'black',
              fontSize: 20,
            }}>
            {newsElement.authorname}
          </Text>
          <Text style={{color: '#A7A9AB', fontFamily: 'DeeDee', fontSize: 14}}>
            {new Intl.DateTimeFormat('ru-RU').format(
              new Date(newsElement.createdAt),
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.news_text}>
        {newsElement.text.length > 200
          ? !opened
            ? newsElement.text.split(' ').slice(0, 20).join(' ') + '...'
            : newsElement.text
          : newsElement.text}
      </Text>
      {newsElement.text.length > 100 && (
        <TouchableOpacity onPress={() => setOpened(state => !state)}>
          <Text style={{color: '#A4CE57', fontSize: 16}}>
            {!opened ? 'Читать далее' : 'Свернуть'}
          </Text>
        </TouchableOpacity>
      )}

      {newsElement.image == null || newsElement.image.length < 10 ? null : (
        <Image
          style={{width: '100%', aspectRatio: '16/9', borderRadius: 5}}
          source={{uri: newsElement.image}}
        />
      )}

      <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
        <TouchableOpacity
          onPress={() => {
            setLiked(state => !state);
            onLike(!liked);
          }}
          style={{
            height: 32,
            width: 64,
            borderRadius: 10,
            backgroundColor: '#F2F4F6',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}>
          <Image
            source={liked ? LikeFilled : Like}
            style={{height: 20, width: 20}}
          />
          <Text style={{fontFamily: 'DeeDee', fontSize: 16, color: '#404041'}}>
            {newsElement.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            height: 32,
            width: 64,
            borderRadius: 10,
            backgroundColor: '#F2F4F6',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}>
          <Image source={Share} style={{height: 20, width: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EventCard: React.FC<INewsCard> = ({newsElement}) => {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <View style={styles.news_container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={
            newsElement?.user?.photo
              ? {
                  uri: newsElement.user.photo,
                }
              : DefaultPicture
          }
        />
        <View style={{marginLeft: 16, gap: 2}}>
          <Text
            style={{
              fontFamily: 'DeeDee',
              color: 'black',
              fontSize: 20,
            }}>
            {newsElement.authorname}
          </Text>
          <Text style={{color: '#A7A9AB', fontFamily: 'DeeDee', fontSize: 14}}>
            {new Intl.DateTimeFormat('ru-RU').format(
              new Date(newsElement.createdAt),
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.news_text}>{newsElement.text}</Text>
      <Text style={[styles.news_text, {color: '#A4CE57'}]}>Адрес</Text>
      <Text style={[styles.news_text, {color: '#000000'}]}>
        {newsElement.address}
      </Text>
      <Text style={[styles.news_text, {color: '#A4CE57'}]}>Дата и время</Text>
      <Text style={[styles.news_text, {color: '#000000'}]}>
        {new Intl.DateTimeFormat('ru-RU').format(new Date(newsElement.date))}
      </Text>
      <Button
        onPress={() => {
          if (!subscribed) {
            Alert.alert('Вы успешно записаны');
          }
          setSubscribed(state => !state);
        }}
        variant={subscribed ? 'outline_green' : 'primary'}
        style={{alignSelf: 'stretch', marginTop: 12}}>
        {subscribed ? 'Отменить запись' : 'Записаться'}
      </Button>
    </View>
  );
};

const GrantCard: React.FC<INewsCard> = ({newsElement}) => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <View style={styles.news_container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={
            newsElement?.user?.photo
              ? {
                  uri: newsElement.user.photo,
                }
              : DefaultPicture
          }
        />
        <View style={{marginLeft: 16, gap: 2}}>
          <Text
            style={{
              fontFamily: 'DeeDee',
              color: 'black',
              fontSize: 20,
            }}>
            {newsElement.authorname}
          </Text>
          <Text style={{color: '#A7A9AB', fontFamily: 'DeeDee', fontSize: 14}}>
            {new Intl.DateTimeFormat('ru-RU').format(
              new Date(newsElement.createdAt),
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.news_text}>{newsElement.text}</Text>
      <Text style={[styles.news_text, {color: '#A4CE57'}]}>Грант</Text>
      <Text style={[styles.news_text, {color: '#000000'}]}>
        {newsElement.money}
      </Text>
      <Button
        onPress={() => {
          if (!subscribed) {
            Alert.alert('Вы успешно подали заявку');
          }
          setSubscribed(state => !state);
        }}
        variant={subscribed ? 'outline_green' : 'primary'}
        style={{alignSelf: 'stretch', marginTop: 12}}>
        {subscribed ? 'Отменить' : 'Подать заявку'}
      </Button>
    </View>
  );
};

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState('main');

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

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
    <View style={{flex: 1, backgroundColor: '#F2F4F6'}}>
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
          paddingVertical: 6,
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
          <View
            style={{
              gap: 6,
            }}>
            <View
              style={[
                styles.swiper,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOptionPress('main')}
                style={[
                  styles.options_background,
                  selectedOption === 'main' ? styles.selected_background : null,
                ]}>
                <Text
                  style={[
                    {
                      fontFamily: 'DeeDee-Bold',
                    },
                    styles.option_text,
                    selectedOption === 'main'
                      ? styles.selected_option_text
                      : styles.deselected_option_text,
                  ]}>
                  Для вас
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOptionPress('events')}
                style={[
                  styles.options_background,
                  selectedOption === 'events'
                    ? styles.selected_background
                    : null,
                ]}>
                <Text
                  style={[
                    styles.option_text,
                    selectedOption === 'events'
                      ? styles.selected_option_text
                      : styles.deselected_option_text,
                  ]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOptionPress('grants')}
                style={[
                  styles.options_background,
                  selectedOption === 'grants'
                    ? styles.selected_background
                    : null,
                ]}>
                <Text
                  style={[
                    styles.option_text,
                    selectedOption === 'grants'
                      ? styles.selected_option_text
                      : styles.deselected_option_text,
                  ]}>
                  Гранты
                </Text>
              </TouchableOpacity>
            </View>
            {selectedOption == 'main'
              ? news.map((newsElement, i) => {
                  return newsElement.type == 'POST' ? (
                    <NewsCard key={i} newsElement={newsElement} />
                  ) : null;
                })
              : selectedOption == 'events'
              ? news.map((newsElement, i) => {
                  return newsElement.type == 'EVENT' ? (
                    <EventCard key={i} newsElement={newsElement} />
                  ) : null;
                })
              : news.map((newsElement, i) => {
                  return newsElement.type == 'ADVERTISEMENT' ? (
                    <GrantCard key={i} newsElement={newsElement} />
                  ) : null;
                })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
