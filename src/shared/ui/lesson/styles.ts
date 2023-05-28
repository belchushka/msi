import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 5,
    shadowColor: '#0000001A'
  },
  image: {
    backgroundColor: 'black',
    borderRadius: 8,
    height: 80,
    aspectRatio: '4/3',
    margin: 10
  },
  header: {
    padding: 8,
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    flex:1
  }
});
