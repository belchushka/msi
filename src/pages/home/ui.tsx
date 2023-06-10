import {Container} from '@/shared/ui';
import React, {useEffect, useState, useLayoutEffect, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Vibration,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {useTheme} from '@/shared/theme';
import ExpandIcon from '@assets/icons/Expand';
import {CourseCard} from '@/entities/course';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import {$host} from '@/shared/api';
import {useStore} from 'effector-react';
import {$authStore} from '@/entities/auth';
import Heart from '@assets/images/heart_icon.png';
import Diamond from '@assets/images/diamond_icon.png';
import Mascot from '@assets/images/mascot_not_found.png';

export const HomePage = () => {
  const {user} = useStore($authStore);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      try {
        const {data} = await $host.get('/course/coursesBy', {
          params: {categoryid: categories.indexOf(selectedCategory)},
        });
        setCourses(data.data);
      } catch (e) {}
      setLoading(false);
    })();
  };

  useEffect(() => {
    getCourses();
  }, [selectedCategory, categories]);

  const [score, level] = useMemo(() => {
    if (user) {
      const level = user.score >= 500 ? Math.floor(user.score / 500) : 1;
      const score = user.score % 500;
      return [score, level];
    }
    return [0, 1];
  }, [user]);

  return (
    <View style={{backgroundColor: '#F9FAFB', flex: 1}}>
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
            onPress={() => {
              Vibration.vibrate(80);
            }}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text style={styles.header}>{selectedCategory}</Text>
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
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingBottom: 100,
          position: 'relative',
        }}>
        <Container
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 20,
            flex: 1,
          }}>
          {loading && (
            <View
              style={{
                position: 'absolute',
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
          {!loading && courses.length === 0 && (
            <View
              style={{
                position: 'absolute',
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
              const disabled = level < 3 && i >= 3;
              return (
                <View
                  style={{
                    marginTop: 16,
                    width:
                      i % 5 === 0
                        ? '100%'
                        : (Dimensions.get('window').width - 80) / 2,
                    alignItems: 'center',
                    ...(disabled && {opacity: 0.4}),
                  }}>
                  <CourseCard
                    active_icon={course.active_icon}
                    progress={1}
                    maxProgress={5}
                    isActive={true}
                    isDone={true}
                    title={course.title}
                    onPress={() => {
                      if (!disabled) {
                        navigation.navigate(ROUTES.COURSE_SCREEN, {
                          courseId: course.id,
                        });
                      } else {
                        Alert.alert(
                          'Дойдите до 3 уровня. Для этого вам нужно набрать 1500 очков',
                        );
                      }
                    }}
                  />
                </View>
              );
            })}
        </Container>
      </ScrollView>
    </View>
  );
};
