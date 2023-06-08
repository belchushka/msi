import {Container} from '@/shared/ui';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {useTheme} from '@/shared/theme';
import DotsIcon from '@assets/icons/Dots';
import ExpandIcon from '@assets/icons/Expand';
import {CourseCard} from '@/entities/course';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import SelectDropdown from 'react-native-select-dropdown';
import {$host} from '@/shared/api';
import {useStore} from 'effector-react';
import {$authStore} from '@/entities/auth';
import Heart from '@assets/images/heart_icon.png';
import Diamond from '@assets/images/diamond_icon.png';
import Mascot from '@assets/images/mascot_not_found.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const HomePage = () => {
  const {user} = useStore($authStore);
  const [selectedCategory, setSelectedCategory] = useState<any>('Гитара');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [courses, setCourses] = useState([]);

  const theme = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!user?.categories.data?.[0]?.label) {
      return;
    }
    setSelectedCategory(user?.categories.data?.[0]?.label);
  }, [user?.categories.data?.[0]?.label]);

  useEffect(() => {
    (async () => {
      const {data} = await $host.get('/quizzes/categories');
      setCategories(data.data);
    })();
  }, []);

  const getCourses = () => {
    (async () => {
      setLoading(true);
      const {data} = await $host.get('/course/coursesBy', {
        params: {categoryid: categories.indexOf(selectedCategory)},
      });
      setLoading(false);

      setCourses(data.data);
    })();
  };

  useEffect(() => {
    getCourses();
  }, [selectedCategory]);

  return (
    <View style={{backgroundColor: '#F9FAFB', flex: 1}}>
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
              <Text
                style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: '600',
                }}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowModal(false);
                }}>
                {category}
              </Text>
            );
          })}
        </ScrollView>
      </Modal>
      <View
        style={[
          styles.top,
          {
            backgroundColor: theme.colors.green.primary,
          },
        ]}>
        <Container
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text style={styles.header}>{selectedCategory}</Text>
            <ExpandIcon />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                backgroundColor: 'white',
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Image source={Heart} />
              <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
                5
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                backgroundColor: 'white',
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Image source={Diamond} />
              <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
                20
              </Text>
            </View>
          </View>
        </Container>
      </View>
      <View style={styles.main}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 20,
            gap: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
          }}>
          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color={theme.colors.green.primary}
              />
            </View>
          )}
          {courses.length === 0 && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 200,
                    resizeMode: 'contain',
                  }}
                  source={Mascot}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    marginTop: 20,
                    fontWeight: '600',
                  }}>
                  По этой категории пока нет курсов(
                </Text>
              </View>
            </View>
          )}
          {!loading &&
            courses.map((course, i) => {
              return (
                <View
                  style={{
                    width:
                      i % 5 === 0
                        ? '100%'
                        : (Dimensions.get('window').width - 20) / 2,
                    alignItems: 'center',
                  }}>
                  <CourseCard
                    active_icon={course.active_icon}
                    progress={1}
                    maxProgress={5}
                    isActive={true}
                    isDone={true}
                    title={course.title}
                    onPress={() => {
                      navigation.navigate(ROUTES.COURSE_SCREEN, {
                        courseId: course.id,
                      });
                    }}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};
