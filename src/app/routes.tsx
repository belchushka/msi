import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitPage} from '@/pages/init';
import {ROUTES} from '@/shared/router';
import {SigninPage} from '@/pages/signin';
import {SignupPage} from '@/pages/signup';
import {useStore} from 'effector-react';
import {$authStore} from '@/entities/auth';
import {HomePage} from '@/pages/home';
import {OnboardingPage} from '@/pages/onboarding';
import {TestScreen} from '@/pages/test';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import HomeIcon from '@assets/icons/Home';
import HomeIconActive from '@assets/icons/HomeActive';
import NewsIcon from '@assets/icons/News';
import NewsIconActive from '@assets/icons/NewsActive';
import MapsIcon from '@assets/icons/Maps';
import MapsIconActive from '@assets/icons/MapsActive';
import ProfileIcon from '@assets/icons/Profile';
import ProfileIconActive from '@assets/icons/ProfileActive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CoursePage} from '@/pages/coursePage';
import {MapPage} from '@/pages/maps';
import {LessonPage} from '@/pages/lessonPage';
import {NewsPage} from '@/pages/news';
import {ProfilePage} from '@/pages/profile';
import {AddNewsPage} from '@/pages/addNews';
import {OnboardingSliderPage} from '@/pages/onboardingSlider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingBottom: 20,
        paddingTop: 14,
        backgroundColor: 'white',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            {options.tabBarIcon &&
              options.tabBarIcon({focused: isFocused, color: '', size: 12})}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabsPage = () => {
  return (
    <SafeView
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        tabBar={MyTabBar}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Курсы',
            tabBarIcon: ({focused}) =>
              focused ? <HomeIconActive /> : <HomeIcon />,
          }}
          name="Home"
          component={HomePage}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Новости',
            tabBarIcon: ({focused}) =>
              focused ? <NewsIconActive /> : <NewsIcon />,
          }}
          name="News"
          component={NewsPage}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Карты',
            tabBarIcon: ({focused}) =>
              focused ? <MapsIconActive /> : <MapsIcon />,
          }}
          name="Maps"
          component={MapPage}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({focused}) =>
              focused ? <ProfileIconActive /> : <ProfileIcon />,
          }}
          name="Profile"
          component={ProfilePage}
        />
      </Tab.Navigator>
    </SafeView>
  );
};

export const Router = () => {
  const {isAuth} = useStore($authStore);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (navigation) {
        const onboardingSliderPassed =
          (await AsyncStorage.getItem('onboardingSliderPassed')) === 'true';
        if (!onboardingSliderPassed) {
          navigation.navigate(ROUTES.ONBOARDING_SLIDER);
        }
        const onboardingPassed =
          (await AsyncStorage.getItem('onboardingPassed')) === 'true';
        if (!onboardingPassed) {
          navigation.navigate(ROUTES.ONBOARDIBG);
        }
      }
    })();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName={isAuth ? ROUTES.HOME : ROUTES.INITIAL}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuth ? (
        <>
          <Stack.Screen name={ROUTES.INITIAL} component={InitPage} />
          <Stack.Screen name={ROUTES.SIGNIN} component={SigninPage} />
          <Stack.Screen name={ROUTES.SIGNUP} component={SignupPage} />
          <Stack.Screen
            name={ROUTES.ONBOARDING_SLIDER}
            component={OnboardingSliderPage}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={ROUTES.HOME} component={TabsPage} />
          <Stack.Screen name={ROUTES.ONBOARDIBG} component={OnboardingPage} />
          <Stack.Screen name={ROUTES.ONBOARDING_TEST} component={TestScreen} />
          <Stack.Screen name={ROUTES.COURSE_SCREEN} component={CoursePage} />
          <Stack.Screen name={ROUTES.LESSON_SCREEN} component={LessonPage} />
          <Stack.Screen name={ROUTES.MAP_SCREEN} component={MapPage} />
          <Stack.Screen name={ROUTES.CREATE_NEWS} component={AddNewsPage} />
        </>
      )}
    </Stack.Navigator>
  );
};
