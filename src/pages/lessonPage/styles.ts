import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  top: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 7,
    padding: 18,
  },

  header: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'DeeDee-Bold',
    paddingVertical: 16,
  },

  description: {
    color: '#76787A',
    fontFamily: 'DeeDeeLight',
    fontSize: 22,
  },

  status: {
    fontSize: 20,
    fontFamily: 'DeeDee',
    color: '#A4CE57',
  },
});
