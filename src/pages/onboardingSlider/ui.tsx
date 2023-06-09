import React, {useRef} from 'react';
import {Image, Text, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Img1 from '@assets/images/onboarding1.png';
import Img2 from '@assets/images/onboarding2.png';
import Img3 from '@assets/images/onboarding3.png';
import {Container} from '@/shared/ui';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@/shared/theme';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROUTES} from '@/shared/router';

export const OnboardingSliderPage = (props: {}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Onboarding
        onDone={async () => {
          await AsyncStorage.setItem('onboardingSliderPassed', 'true');
          navigation.navigate(ROUTES.INITIAL);
        }}
        titleStyles={{
          fontFamily: 'DeeDee-Bold',
        }}
        subTitleStyles={{
          fontFamily: 'DeeDee',
        }}
        bottomBarColor="white"
        nextLabel="Далее"
        skipLabel="Пропустить"
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={Img1} />,
            title: 'Узнавай, делись, твори!',
            subtitle:
              'Проходи курсы по творческим направлениям и повышай уровень своих навыков',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={Img2} />,
            title: 'Находи единомышленников',
            subtitle:
              'Добавляй друзей в приложении и общайся на интересные темы вместе с ними',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={Img3} />,
            title: 'Записывайся в школы',
            subtitle:
              'Узнай о МШИ в твоем районе и приходи на занятия, чтобы получить новые знания',
          },
        ]}
      />
    </View>
  );
};
