import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch',
  },
  container_inner: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  middle_block: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 30,
    flex: 1,
    marginTop: 46,
    justifyContent: 'center',
  },
  bottom_block: {
    paddingBottom: 30,
  },
  logo: {
    width: 190,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  bottom_block_text: {
    fontSize: 16,
  },
});
