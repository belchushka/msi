module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
