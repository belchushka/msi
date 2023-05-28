module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'effector/babel-plugin',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@assets': './src/shared/assets',
        },
      },
    ],
  ],
};
