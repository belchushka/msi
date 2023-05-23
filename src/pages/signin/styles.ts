import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
  },
  header: {
    marginTop: 24,
  },
  header_text: {
    textAlign: 'center',
    color: 'white',
  },
  header_text_title: {
    fontSize: 26,
    fontWeight: '700',
  },
  header_text_subtitle: {
    fontSize: 18,
    marginTop: 5,
  },
  signinForm: {
    alignSelf: 'stretch',
    marginTop: 32,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  actions_text: {
    fontSize: 16,
  },
  bottom_actions: {
    flexGrow: 12,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  bottom_actions_title: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  authMethodButtons: {
    flexDirection: 'row',
    gap: 35,
  },
  authMethodButtons_button: {
    flex: 1,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
