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
    fontWeight: 'bold',
    paddingVertical: 16,
  },

  description: {
    color: '#76787A',
    fontSize: 22,
  },

  status: {
    fontSize: 20,
    color: '#A4CE57',
  },
});
