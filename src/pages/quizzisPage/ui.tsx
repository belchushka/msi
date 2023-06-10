import React, {useState} from 'react';
import styles from './styles';
import {Alert, Text, View} from 'react-native';
import {SafeView} from '@/shared/ui/safeView';
import {Button} from '@/shared/ui';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@/shared/theme';
import * as Progress from 'react-native-progress';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IWithStyle} from '@/shared/types';
import {$authHost} from '@/shared/api';
import {AuthApi} from '@/entities/auth';
import {useEvent} from 'effector-react';

interface IAnswerForm extends IWithStyle {
  answer: string;
  onPress: () => void;
  selected: boolean;
  invalid: boolean;
}

const AnswerForm: React.FC<IAnswerForm> = ({
  answer,
  onPress,
  selected,
  invalid,
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.answerContainer,
        selected && {borderColor: theme.colors.oceanic['400']},
        invalid && {borderColor: theme.colors.red[800]},
      ]}>
      <Text style={styles.answerText}>{answer}</Text>
    </TouchableOpacity>
  );
};

export const QuizzisPage = ({route}) => {
  const questions = route.params?.quizzis?.quizzes?.data;
  const [questionId, setQuestionId] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const getMe = useEvent(AuthApi.getMeFx);
  const [isInvalid, setIsInvalid] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const handleButtonClick = async () => {
    if (questionId < questions.length - 1) {
      if (
        questions[questionId].correct_answer !== selectedAnswers[questionId]
      ) {
        setIsInvalid(true);
        setTimeout(() => {
          setQuestionId(state => ++state);
          setIsInvalid(false);
        }, 500);
        return;
      }
      setQuestionId(state => ++state);
    } else {
      try {
        await $authHost.post('/quizzes/pass', {
          id: route.params?.quizzis?.quizzes?.id,
          answers: selectedAnswers.map(el => ({answer: el})),
        });
        await getMe();
        Alert.alert('Тест умпешно пройден, скоро вам начислят баллы');
        navigation.goBack();
      } catch (e) {}
    }
  };

  if (!questions) {
    navigation.goBack();
    return;
  }

  const currentQuestion = questions[questionId] || null;

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
            <Text style={styles.categoryQuestion}>
              {route.params?.quizzis?.title}
            </Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </View>
        <View style={styles.center}>
          {currentQuestion.answers.map((el, num) => {
            return (
              <AnswerForm
                invalid={selectedAnswers[questionId] === el && isInvalid}
                selected={
                  selectedAnswers[questionId] === el ||
                  (isInvalid && questions[questionId].correct_answer === el)
                }
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
