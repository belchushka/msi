import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  header_text: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'DeeDee-Bold'
  },

  news_container: {
    color: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#0000001A',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
  },

  news_text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'DeeDee',
    marginTop: 6,
  },
});
