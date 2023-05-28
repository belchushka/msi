import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    borderWidth: 8,
    borderRadius: 8,
    padding: 4,

  },
  innerSquare: {
    alignSelf: 'stretch',
    height: '100%',
    borderRadius: 8
  },

  title: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  }
});

export default styles;