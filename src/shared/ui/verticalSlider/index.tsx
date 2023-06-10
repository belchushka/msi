import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ResizeMode, Video} from 'expo-av';
import PlayImage from '@assets/images/play.png';
import {Container} from '../container';
import {useFocusEffect} from '@react-navigation/native';
import SchoolImage from "@assets/images/school_icon.png"

const height = Math.round(Dimensions.get('window').height);

const VerticalSlider = ({data, resultSubmitVisible}) => {
  const scrollViewRef = useRef();
  const visibility = useSharedValue(0);
  const video = React.useRef<Array<any>>([]);
  const totalSlides = data.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (resultSubmitVisible) {
      video.current[currentSlide].playing = false;
      video.current[currentSlide].video.pauseAsync();
      visibility.value = 1;
    }
  }, [video, resultSubmitVisible]);

  const panGestureEvent = useCallback(
    ({nativeEvent}) => {
      const translation = nativeEvent.translationY;
      const startPoint = currentSlide * height;
      const direction = translation > 0;
      if (currentSlide != 0) {
        if (
          currentSlide != totalSlides - 1 ||
          (currentSlide == totalSlides - 1 && direction)
        ) {
          scrollViewRef.current.scrollTo({
            y: startPoint - translation,
            animated: false,
          });
        }
      }
      if (currentSlide == 0 && !direction) {
        scrollViewRef.current.scrollTo({
          y: startPoint - translation,
          animated: false,
        });
      }
    },
    [currentSlide],
  );
  const panGestureEventChange = useCallback(
    ({nativeEvent}) => {
      const translation = nativeEvent.translationY;
      const startPoint = currentSlide * height;
      const direction = translation > 0;
      if (nativeEvent.state === State.END) {
        if (!direction) {
          if (currentSlide != totalSlides - 1) {
            if (Math.abs(parseInt(translation)) < height / 10) {
              scrollViewRef.current.scrollTo({
                y: startPoint,
                animated: true,
              });
            } else if (Math.abs(parseInt(translation)) > height / 10) {
              scrollViewRef.current.scrollTo({
                y: startPoint + height,
                animated: true,
              });
              video.current[currentSlide].video.stopAsync();
              video.current[currentSlide].playing = false;
              setCurrentSlide(state => state + 1);
              if (visibility.value != 1) {
                video.current[currentSlide + 1].video.playAsync();
                video.current[currentSlide + 1].playing = false;
              }
            }
          }
        } else if (direction) {
          if (currentSlide != 0) {
            if (Math.abs(parseInt(translation)) < height / 10) {
              scrollViewRef.current.scrollTo({
                y: startPoint,
                animated: true,
              });
            } else if (Math.abs(parseInt(translation)) > height / 10) {
              scrollViewRef.current.scrollTo({
                y: startPoint - height,
                animated: true,
              });
              video.current[currentSlide].video.stopAsync();
              video.current[currentSlide].playing = false;
              setCurrentSlide(state => state - 1);
              if (visibility.value != 1) {
                video.current[currentSlide - 1].video.playAsync();
                video.current[currentSlide - 1].playing = true;
              }
            }
          }
        }
      }
    },
    [video, currentSlide],
  );
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: visibility.value,
    };
  });
  useEffect(() => {
    if (video?.current[0].video) {
      video.current[0].video.playAsync();
      video.current[0].playing = true;
    }
  }, [video]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler
        onGestureEvent={panGestureEvent}
        onHandlerStateChange={panGestureEventChange}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={ref => (scrollViewRef.current = ref)}
          contentContainerStyle={{flexGrow: 1}}
          style={[styles.scrollContainer]}>
          {data &&
            data.map((el, ind) => {
              return (
                <View
                  key={ind}
                  style={{
                    width: '100%',
                    height: height,
                    position: 'relative',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (!video.current[ind].playing) {
                        video.current[ind].video.playAsync();
                        video.current[ind].playing = true;
                        visibility.value = 0;
                      } else {
                        video.current[ind].video.pauseAsync();
                        video.current[ind].playing = false;
                        visibility.value = 1;
                      }
                    }}>
                    <Video
                      ref={ref =>
                        (video.current[ind] = {
                          video: ref,
                          playing: false,
                          translation: el.en_translation,
                        })
                      }
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{
                        uri: el,
                      }}
                      isLooping
                      resizeMode={ResizeMode.COVER}
                    />
                    <Animated.View style={[styles.playBtn, animatedStyles]}>
                      <Image
                        source={PlayImage}
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    </Animated.View>
                    <Container
                      style={{
                        position: 'absolute',
                        bottom: 65,
                        backgroundColor: "#0000004D",
                        paddingBottom: 20,
                        width: '100%',
                      }}>
                      <View style={{}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={SchoolImage}></Image>
                          <Text style={{fontFamily: 'DeeDee-Bold', fontSize: 20}}>
                            МШИ в Митино
                          </Text>
                        </View>
                        <Text style={{fontFamily: 'DeeDee', fontSize: 16, marginHorizontal: 20}}>
                          Курс по гитарному мастерству для начинающих. Переходите в раздел курсов и осваивайте новый и полезный навык! <Text style={{fontFamily: 'DeeDee-Bold', color: '#BFDD47'}}>#мши #искусство #образование</Text>
                        </Text>
                      </View>
                    </Container>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: 'auto',
  },

  scrollContainerContent: {
    flexGrow: 1,
  },
  playBtn: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
  },
});

export default VerticalSlider;
