import {Container} from '@/shared/ui';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Text,
  Image,
  Alert,
  Modal,
  ScrollView,
  Dimensions,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import {useStore, useEvent} from 'effector-react';
import {$authStore, logoutFx, setAuthUser} from '@/entities/auth';
import DefaultPicture from '@assets/images/default_userpicture.png';
import Exit from '@assets/icons/Exit';
import Edit from '@assets/icons/Edit';
import styles from './styles';
import * as Progress from 'react-native-progress';
import {useTheme} from '@/shared/theme';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {$authHost, $host} from '@/shared/api';
import {View} from 'react-native';
import Ach1 from '@assets/images/achievement1.png';
import Ach2 from '@assets/images/rating.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfilePage = () => {
  const {user} = useStore($authStore);
  const logout = useEvent(logoutFx);
  const navigation = useNavigation();
  const [selectedAvatar, setSelectedAvatar] =
    useState<null | DocumentPickerResponse>(null);
  const setUser = useEvent(setAuthUser);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();

  const onLogout = async () => {
    await logout();
    navigation.navigate(ROUTES.INITIAL);
  };

  useEffect(() => {
    (async () => {
      const {data} = await $host.get('/quizzes/categories');
      setCategories(data.data);
    })();
  }, []);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      if (response[0]) {
        setSelectedAvatar(response[0]);
        updateUserAvatar(response[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const updateUserAvatar = async (file: DocumentPickerResponse) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const {data} = await $authHost.post('/parse/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newAvatar = data.data;

      const {data: userData} = await $authHost.put('/users/me', {
        photo: newAvatar,
      });

      setUser(userData.data);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  const updateUserCategory = async (category: string) => {
    try {
      const {data: userData} = await $authHost.put('/users/me', {
        categories: {
          data: [
            {
              id: categories.indexOf(category),
              label: category,
              value: category,
            },
          ],
        },
      });
      setUser(userData.data);
      await AsyncStorage.removeItem("onboardingPassed");
      navigation.navigate(ROUTES.ONBOARDIBG)
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  const avatar = useMemo(() => {
    if (selectedAvatar) {
      return {uri: selectedAvatar.uri};
    }

    if (user.photo) {
      return {uri: user.photo};
    }

    return DefaultPicture;
  }, [selectedAvatar, user]);

  return (
    <View style={{flex: 1}}>
      <Modal
        onRequestClose={() => {
          setShowModal(false);
        }}
        visible={showModal}
        animationType="slide">
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 25,
            paddingBottom: 60,
            paddingTop: Dimensions.get('window').height / 2 - 100,
          }}>
          {categories.map(category => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Vibration.vibrate(80);
                  setShowModal(false);
                  updateUserCategory(category);
                }}>
                <Text
                  style={{
                    color: '#404041',
                    fontFamily: 'DeeDee',
                    fontSize: 30,
                  }}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Modal>

      <ScrollView style={{backgroundColor: '#F9FAFB', flex: 1}}>
        <Container style={{flex: 1}}>
          <View style={[styles.baseinfo_container, {marginTop: 32}]}>
            <View style={{flexDirection: 'row'}}>
              <Edit
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginRight: 50,
                }}
              />
              <TouchableOpacity onPress={handleDocumentSelection}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 24,
                  }}
                  source={avatar}
                />
              </TouchableOpacity>
              <Exit
                onPress={onLogout}
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginLeft: 50,
                }}
              />
            </View>
            <Text style={styles.name}>{user.firstname}</Text>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                marginTop: 12,
                marginBottom: 12,
                fontFamily: 'DeeDee',
              }}>
              Уровень 1
            </Text>

            <Progress.Bar
              width={400}
              borderRadius={40}
              borderColor="transparent"
              color={theme.colors.green.primary}
              height={20}
              progress={0.2}
              unfilledColor={theme.colors.dark['100']}
            />
          </View>

          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 0,
              paddingVertical: 12,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: theme.colors.dark[100],
              marginTop: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontFamily: 'DeeDee',
              }}>
              Я увлекаюсь
            </Text>
            <Text
              style={{
                color: theme.colors.green[500],
                fontSize: 20,
                fontFamily: 'DeeDee',
              }}>
              {user?.categories.data?.[0]?.label}
            </Text>
          </TouchableOpacity>
        
          <Image source={Ach1} style={{width: '100%', height: 300, resizeMode: 'contain',}}></Image>
          <Image source={Ach2} style={{width: '100%', height: 200, resizeMode: 'contain', marginTop: 12}}></Image>
          
        
        </Container>
        
      </ScrollView>
    </View>
  );
};
