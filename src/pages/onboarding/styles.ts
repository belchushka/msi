import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 4,
    justifyContent: 'center',
    gap: 20,
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
  },
  flowCard: {
    padding: 20,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'white',
  },

  flowCard_title: {
    fontSize: 22,
    fontWeight: '700',
  },
  florCard_description: {
    fontSize: 14,
    marginTop: 8,
  },
});
