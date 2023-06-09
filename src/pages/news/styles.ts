import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },

  swiper: {
    flex: 0.1,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#00000033'
  },

  options_background: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  selected_background: {
      borderBottomColor: '#A4CE57',
      borderBottomWidth: 3,
  },

  option_text: {
    fontFamily: 'DeeDee',
    fontSize: 20
  },

  selected_option_text: {
      fontFamily: 'DeeDee',
      color: '#A4CE57',
  },

  deselected_option_text: {
      fontFamily: 'DeeDee',
      color: 'black',
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
