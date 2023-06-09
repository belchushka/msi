import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 3,
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
  button_outline_green: {
    backgroundColor: 'transparent',
    borderColor: '#A4CE57'
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
});
