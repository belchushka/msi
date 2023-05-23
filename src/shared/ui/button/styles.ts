import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
  },
  button_filled: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
  },
  button_outline: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 20,
  },
});
