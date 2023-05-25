import {Button, Container} from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Vaza from '@assets/images/imageOnboarding.png';
import StartFromScratch from '@assets/images/imageStartFromScratch.png';
import StartTest from '@assets/images/imageStartWithTest.png';
import styles from './styles';
import {useTheme} from '@/shared/theme';
import {IWithStyle} from '@/shared/types';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IFlowCard extends IWithStyle {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
  selected: boolean;
}

const FlowCard: React.FC<IFlowCard> = ({
  image,
  title,
  description,
  style,
  onPress,
  selected,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        style,
        styles.flowCard,
        selected && {
          borderColor: theme.colors.oceanic['400'],
        },
      ]}>
      <Image source={image} />
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={[styles.flowCard_title, {color: theme.colors.dark['800']}]}>
          {title}
        </Text>
        <Text
          style={[
            styles.florCard_description,
            {color: theme.colors.dark['800']},
          ]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const OnboardingPage = () => {
  const navigation = useNavigation();
  const [selectedFlow, setSelectedFlow] = useState<'test' | 'skip' | null>(
    null,
  );

  const onClick = () => {
    if (!selectedFlow) {
      return;
    }


    if (selectedFlow === 'test') {
      navigation.navigate(ROUTES.ONBOARDING_TEST);
    }

    if (selectedFlow === 'skip') {
      navigation.navigate(ROUTES.HOME);
      AsyncStorage.setItem('onboardingPassed', 'true');
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('onboardingPassed', 'false');
  }, []);
  return (
    <SafeView style={styles.container}>
      <Container style={styles.container}>
        <View style={styles.top}>
          <Image source={Vaza} />
        </View>
        <View style={styles.center}>
          <FlowCard
            selected={selectedFlow === 'skip'}
            onPress={() => setSelectedFlow('skip')}
            image={StartFromScratch}
            title="Начать с нуля"
            description="Обучение начнется с полного нуля. Подойдет для начинающих"
          />
          <FlowCard
            selected={selectedFlow === 'test'}
            onPress={() => setSelectedFlow('test')}
            image={StartTest}
            title="Пройти тест"
            description="По результатам теста можно пропустить уже изученый материал"
          />
        </View>
        <View style={styles.bottom}>
          <Button
            onPress={onClick}
            disabled={selectedFlow === null}
            variant="primary">
            Далее
          </Button>
        </View>
      </Container>
    </SafeView>
  );
};
