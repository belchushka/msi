import {$host} from '@/shared/api';
import {createEffect} from 'effector';

const getQuizCategoriesFx = createEffect<void, Array<string>>({
  handler: async () => {
    const {data} = await $host.get('/quizzes/categories');
    return data.data;
  },
});

export const QuizApi = {
  getQuizCategoriesFx,
};
