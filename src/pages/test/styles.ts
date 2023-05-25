import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  top: {
    flex: 1,
    paddingTop: 30,
    gap: 20,
  },

  center: {
    alignSelf: 'stretch',
    gap: 20,
    marginTop: 10,
  },

  bottom: {
    paddingBottom: 30,
    justifyContent: 'center',
  },

  questionText: {
    fontSize: 20,
    color: 'black',
  },

  questionContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  categoryQuestion: {
    color: 'white',
    fontSize: 16,
  },

  categoryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  answerContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: 'white',
    borderWidth: 3,
    paddingVertical: 20,
    borderRadius: 8,
  },

  answerText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },

  progressBarStyle: {
    color: '#64B17E',
  },
});
