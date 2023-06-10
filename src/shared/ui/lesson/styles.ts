import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    backgroundColor: 'black',
    borderRadius: 8,
    height: 80,
    aspectRatio: '4/3',
    margin: 10,
  },
  header: {
    padding: 8,
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    flex: 1,
    fontFamily: 'DeeDee',
  },
});
