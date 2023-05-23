import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 8,
  },
  pill_selected: {
    backgroundColor: 'white',
  },
  pill_text: {
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
});
