import VerticalSlider from '@/shared/ui/verticalSlider';
import React from 'react';

const videos = [
  'http://campfire.ext-it.ru:4088/3516531344361164-telegram-cloud-document-2-5197418866388512714.mp4',
  'http://campfire.ext-it.ru:4088/5721713452426673-Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20%28Official%20Music%20Video%29.mp4',
  'http://campfire.ext-it.ru:4088/3516531344361164-telegram-cloud-document-2-5197418866388512714.mp4',
  'http://campfire.ext-it.ru:4088/5721713452426673-Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20%28Official%20Music%20Video%29.mp4',
];

export const ShortsPage = () => {
  return <VerticalSlider resultSubmitVisible={false} data={videos} />;
};
