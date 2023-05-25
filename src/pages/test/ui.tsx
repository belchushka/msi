import React, {useEffect, useState} from 'react';
import {useTheme} from '@/shared/theme';
import {SafeView} from '@/shared/ui/safeView';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button} from '@/shared/ui';
import {IWithStyle} from '@/shared/types';
import * as Progress from 'react-native-progress';
import {$authHost} from '@/shared/api';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAnswerForm extends IWithStyle {
  answer: string;
  onPress: () => void;
  selected: boolean;
}

const AnswerForm: React.FC<IAnswerForm> = ({answer, onPress, selected}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.answerContainer,
        selected && {borderColor: theme.colors.oceanic['400']},
      ]}>
      <Text style={styles.answerText}>{answer}</Text>
    </TouchableOpacity>
  );
};

export const TestScreen = () => {
  const theme = useTheme();

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(0);
  const [category, setCategory] = useState('');
  const [quizzId, setQuizzId] = useState(0);
  const navigation = useNavigation();

  const handleButtonClick = async () => {
    if (questionId < questions.length - 1) {
      setQuestionId(state => ++state);
    } else {
      try {
        await $authHost.post('/quizzes/pass', {
          id: quizzId,
          answers: selectedAnswers.map(el => ({answer: el})),
        });
        await AsyncStorage.setItem('onboardingPassed', 'true');

        navigation.navigate(ROUTES.HOME);
      } catch (e) {}
    }
  };

  const fetchOnboardingTest = async () => {
    const {data} = await $authHost.get('/quizzes/register');
    setQuestions(data.data.data);
    setCategory(data.data.title);
    setQuizzId(data.data.id);
    setQuestionId(0);
  };

  const currentQuestion = questions[questionId] || null;

  useEffect(() => {
    fetchOnboardingTest();
  }, []);

  if (!currentQuestion) {
    return (
      <SafeView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color={theme.colors.green.primary} />
      </SafeView>
    );
  }

  return (
    <SafeView style={styles.container}>
      <View style={styles.top}>
        <Progress.Bar
          width={null}
          borderRadius={40}
          borderColor="transparent"
          color={theme.colors.green.primary}
          height={20}
          progress={questionId / questions.length}
          unfilledColor={theme.colors.dark['100']}
        />
        <View style={styles.questionContainer}>
          <View
            style={[
              styles.categoryContainer,
              {
                backgroundColor: theme.colors.green.primary,
              },
            ]}>
            <Text style={styles.categoryQuestion}>{category}</Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </View>
        <View style={styles.center}>
          {currentQuestion.answers.map((el, num) => {
            return (
              <AnswerForm
                selected={selectedAnswers[questionId] === el}
                key={num}
                answer={el}
                onPress={() =>
                  setSelectedAnswers(state => {
                    const cp = [...state];
                    cp[questionId] = el;
                    return cp;
                  })
                }
              />
            );
          })}
        </View>
      </View>

      <View style={styles.bottom}>
        <Button
          disabled={!selectedAnswers[questionId]}
          variant="primary"
          onPress={handleButtonClick}>
          Ответить
        </Button>
      </View>
    </SafeView>
  );
};
