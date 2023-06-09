import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  stepper: {
    flexDirection: 'column',
    flex: 4,
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  firstForm_container: {
    gap: 32,
  },
  bottomView: {
    flexGrow: 2,
    gap: 20,
    paddingBottom: 20,
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
  },
  topView_title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
  topView_subtitle: {
    fontSize: 20,
    color: 'white',
  },
});
