import React, { useEffect, useState } from 'react';
import styles from './styles';
import { useTheme } from '@/shared/theme';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeView } from '@/shared/ui/safeView';

import UserIcon from '@assets/icons/UserAmount'
import { Button } from '@/shared/ui';
import { Lesson } from '@/shared/ui/lesson';
import { $host } from '@/shared/api';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/shared/router';

export const CoursePage = ({route}) => {

  const { courseId } = route.params;

  console.log(courseId)

  const [course, setCourse] = useState(null); 
  const [lessons, setLessons] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const {data} = await $host.get('/course/course', {params: {id: courseId}});
      setCourse(data.data);
      setLessons(data.data.stages)
    })()
  },[courseId])

  const theme = useTheme();

  const [selectedOption, setSelectedOption] = useState('info');

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  }

  if (!course){
    return <ActivityIndicator/>
  }

  const navigation = useNavigation();


  return (
    <SafeView style={{flex: 1}}>
      <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
        <View style={styles.top_image}>
          <Image style={{flex: 1}} source={{uri: course.background_img}}/>
        </View>

        <View style={[styles.swiper, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleOptionPress('info')} style={[styles.options_background, selectedOption==="info" ? styles.selected_background : null]}> 
            <Text style={[styles.option_text,selectedOption==="info" ? styles.selected_option_text : styles.deselected_option_text]}>Инфо</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleOptionPress('lessons')} style={[styles.options_background, selectedOption==="lessons" ? styles.selected_background : null]}> 
            <Text style={[styles.option_text,selectedOption==="lessons" ? styles.selected_option_text : styles.deselected_option_text]}>Уроки ({lessons == null ? "0" : lessons.length})</Text>
          </TouchableOpacity>

        </View>

        {selectedOption === 'info' ? (
          <View style={styles.base_info}>
            <ScrollView showsVerticalScrollIndicator = {false}>
              <View style={styles.tag_row}>
                <View style={styles.tag_container}>
                  <Text style={styles.tag_text}>{course.difficultylabel}</Text>
                </View>
                <View style={[styles.tag_container, {flexDirection: 'row',gap: 10,flexWrap: 'wrap',}]}>
                  <UserIcon/>
                  <Text style={styles.tag_text}>10</Text>
                </View>
              </View>
              <Text style={styles.text_header}>{course.title}</Text>
              <Text style={styles.text}>{course.description}</Text>
              <Text style={styles.text_subheader}>Что нужно знать?</Text>
              <Text style={styles.text}>{course.requirements}</Text>
              
            </ScrollView>
          </View>
        ) : (
          <View style={styles.base_info}>
            <ScrollView showsVerticalScrollIndicator = {false}>
                {lessons.map((lesson, i)=>{
                    return <TouchableOpacity activeOpacity={0.8} onPress={() => {
                      navigation.navigate(ROUTES.LESSON_SCREEN, {
                        lesson: lesson
                      });
                    }}>
                      <Lesson title={lesson.title}></Lesson>
                    </TouchableOpacity>
                  
                })}
              
            </ScrollView>
          </View>
        )}

        
      </View>
    </SafeView>
  );
};
