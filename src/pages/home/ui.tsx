import { Container, GradientBackground } from '@/shared/ui';
import {SafeView} from '@/shared/ui/safeView';
import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import styles from './styles';
import { useTheme } from '@/shared/theme';
import { GradientHorisontal } from '@/shared/ui/gradientHorisontal';
import DotsIcon from '@assets/icons/Dots'
import ExpandIcon from '@assets/icons/Expand'
import HeartIcon from '@assets/icons/Heart'
import DiamondIcon from '@assets/icons/Diamond'
import { CourseCard } from '@/entities/course';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@/shared/router';
import SelectDropdown from 'react-native-select-dropdown';
import { $host } from '@/shared/api';
import { useStore } from 'effector-react';
import { $authStore } from '@/entities/auth';


export const HomePage = () => {
  const {user} = useStore($authStore)
  const userDefaultCategory = user?.categories.data?.[0]?.label || null
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const [categories, setCategories] = useState([])

  const [courses, setCourses] = useState([]);

  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(()=>{
    (async ()=>{
      const {data} = await $host.get('/quizzes/categories');
      console.log(data)
      setCategories(data.data)

      
    })()
  },[])

  const getCourses = ()=>{
    (async ()=>{
      console.log(selectedCategory);
      const {data} = await $host.get('/course/coursesBy', {params: {categoryid: categories.indexOf(selectedCategory)}});
      setCourses(data.data);
      console.log(data.data)
    })()
  }

  useEffect(()=>{
    getCourses()
  }, [selectedCategory])

  return (
    <View style={{backgroundColor: "#F9FAFB", flex: 1}}>
      <View style={styles.top}>
        <GradientHorisontal colors={[theme.colors.green['400'], theme.colors.green['700']]} style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SelectDropdown 
              buttonStyle={{padding: 0, margin: 0, backgroundColor: 'transparent'}}
              data={categories}
              renderCustomizedButtonChild={(item, index) => {
                return <View style = {{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <Text style={styles.header}>{item}</Text>
                  <ExpandIcon/>
                </View>
              }}
              defaultValue={userDefaultCategory}
              onSelect={(selectedItem, index) => {
                setSelectedCategory(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <HeartIcon/>
            <Text style={{marginHorizontal: 5}}>5</Text>
            <DiamondIcon/>
            <Text style={{marginHorizontal: 5}}>20</Text>
            <DotsIcon></DotsIcon>
          </View>
        </GradientHorisontal>
      </View>
      <View style={styles.main}>
        <ScrollView contentContainerStyle={{
          paddingVertical: 20,
          gap: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap', 
        }}>
          {courses.map((course, i)=>{
            return <View style={{
              width: i % 5 === 0 ? '100%' : (Dimensions.get('window').width - 20) /2,
              alignItems: 'center'
            }}>
              <CourseCard active_icon={course.active_icon} progress={1} maxProgress={5} isActive={true} isDone={true} title={course.title} onPress={() => {
                navigation.navigate(ROUTES.COURSE_SCREEN, {
                  courseId: course.id
                });
              }} />
            </View>
          })}
        </ScrollView>
      </View>
    </View>
  );
};
