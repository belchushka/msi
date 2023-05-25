import React, { useState } from 'react';
import { useTheme } from '@/shared/theme';
import { SafeView } from '@/shared/ui/safeView';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Button, Container } from '@/shared/ui';
import { IWithStyle } from '@/shared/types';
import * as Progress from 'react-native-progress';

interface IAnswerForm extends IWithStyle {
    answer: string,
    onPress: () => void;
    selected: boolean;
}

const AnswerForm: React.FC<IAnswerForm> = ({
    answer,
    onPress,
    selected,
}) => {
    const theme = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[
                styles.answerContainer,
                selected && { borderColor: theme.colors.oceanic['400'], },
            ]}>
            <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
    );
};



export const TestScreen = () => {
    const theme = useTheme()

    const [selectedFlow, setSelectedFlow] = useState<'var1' | 'var2' | 'var3' | 'var4' | null>(
        null,
    );

    const [progress, setProgress] = useState(0);

    const handleButtonClick = () => {
        if (progress < 1) {
            setProgress(progress + 0.1);
        }
    };

    return (
        <SafeView style={styles.container}>
            <View style={styles.top}>
                <Progress.Bar width={null}
                    borderRadius={40}
                    borderColor='transparent'
                    color={theme.colors.green['700']}
                    height={20}
                    progress={.2}
                    unfilledColor={theme.colors.dark['100']}
                />
                <Container style={styles.questionContainer}>
                    <Container style={[styles.categoryContainer, {
                        backgroundColor: theme.colors.green.primary
                    }]}>
                        <Text style={styles.categoryQuestion}>
                            Категория
                        </Text>
                    </Container>
                    <Text style={styles.questionText}>
                        Кто является автором пьессы Гамлет?
                    </Text>
                </Container>
            </View>

            <View style={styles.center}>
                <AnswerForm selected={selectedFlow === 'var1'} answer='Жан Батист Мольер' onPress={() => setSelectedFlow('var1')}></AnswerForm>
                <AnswerForm selected={selectedFlow === 'var2'} answer='Уильям Шекспир' onPress={() => setSelectedFlow('var2')}></AnswerForm>
                <AnswerForm selected={selectedFlow === 'var3'} answer='Антон Чехов' onPress={() => setSelectedFlow('var3')}></AnswerForm>
                <AnswerForm selected={selectedFlow === 'var4'} answer='Максим Горький' onPress={() => setSelectedFlow('var4')}></AnswerForm>
            </View>

            <View style={styles.bottom}>
                <Button variant='primary' onPress={handleButtonClick}>
                    Ответить
                </Button>
            </View>
        </SafeView>
    )
};