import React from 'react';
import {SafeView} from '@/shared/ui/safeView';
import {Image, Text, View} from 'react-native';
import SchoolImage from '@assets/images/schoolImage.png';
import {ScrollView} from 'react-native-gesture-handler';
import Teacher1 from '@assets/images/teacher1.png';
import Teacher2 from '@assets/images/teacher2.png';
import Teacher3 from '@assets/images/teacher3.png';
import Otz1 from '@assets/images/otz1.png';
import Otz2 from '@assets/images/otz2.png';
import Star from '@assets/images/star.png';
import {useStore} from 'effector-react';
import {$authStore} from '@/entities/auth';

export const SchoolPage = ({route}) => {
  const {user} = useStore($authStore);
  const school = route.params.school;

  return (
    <SafeView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Image source={SchoolImage} style={{width: '100%'}} />
        <ScrollView style={{flex: 1, marginTop: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 32,
              fontFamily: 'DeeDee-Bold',
              marginHorizontal: 20,
            }}>
            {school.name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'DeeDee',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
            {school.address}
          </Text>
        </ScrollView>
        <View style={{flex: 3, marginHorizontal: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'DeeDee-Bold',
              marginTop: 10,
            }}>
            Направления
          </Text>
          <ScrollView
            style={{flexDirection: 'row', marginTop: 8, gap: 8}}
            horizontal
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                borderColor: '#A4CE57',
                borderWidth: 3,
              }}>
              <Text
                style={{fontFamily: 'DeeDee', fontSize: 20, color: '#A4CE57'}}>
                Джаз
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                borderColor: '#A4CE57',
                borderWidth: 3,
              }}>
              <Text
                style={{fontFamily: 'DeeDee', fontSize: 20, color: '#A4CE57'}}>
                {user?.categories.data?.[0]?.label}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                borderColor: '#A4CE57',
                borderWidth: 3,
              }}>
              <Text
                style={{fontFamily: 'DeeDee', fontSize: 20, color: '#A4CE57'}}>
                Графика
              </Text>
            </View>
          </ScrollView>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'DeeDee-Bold',
              marginTop: 24,
            }}>
            Учителя
          </Text>
          <ScrollView
            horizontal
            style={{flexDirection: 'row', marginTop: 8}}
            contentContainerStyle={{
              flexDirection: 'row',
              marginTop: 8,
              gap: 12,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 28,
                paddingHorizontal: 14,
              }}>
              <Image source={Teacher1} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'DeeDee',
                  color: 'black',
                  marginTop: 12,
                }}>
                Логинова А. В
              </Text>
              <Text
                style={{fontSize: 18, fontFamily: 'DeeDee', color: '#A7A9AB'}}>
                Учитель скрипки
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Image source={Star} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'DeeDee',
                    color: '#000000',
                  }}>
                  {' '}
                  {'4.' + Math.floor(Math.random() * 9) + 1}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 28,
                paddingHorizontal: 14,
              }}>
              <Image source={Teacher3} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'DeeDee',
                  color: 'black',
                  marginTop: 12,
                }}>
                Микуленко И. С
              </Text>
              <Text
                style={{fontSize: 18, fontFamily: 'DeeDee', color: '#A7A9AB'}}>
                Учитель хора
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Image source={Star} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'DeeDee',
                    color: '#000000',
                  }}>
                  {' '}
                  {'4.' + Math.floor(Math.random() * 9) + 1}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 28,
                paddingHorizontal: 14,
              }}>
              <Image source={Teacher2} />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'DeeDee',
                  color: 'black',
                  marginTop: 12,
                }}>
                Леванова Г. Д
              </Text>
              <Text
                style={{fontSize: 18, fontFamily: 'DeeDee', color: '#A7A9AB'}}>
                Учитель театра
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Image source={Star} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'DeeDee',
                    color: '#000000',
                  }}>
                  {' '}
                  {'4.' + Math.floor(Math.random() * 9) + 1}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'DeeDee-Bold',
              marginTop: 24,
            }}>
            Отзывы
          </Text>
          <Image
            source={Otz1}
            style={{
              width: '100%',
              marginTop: 10,
              resizeMode: 'contain',
              height: 150,
            }}
          />
          <Image
            source={Otz2}
            style={{
              width: '100%',
              marginBottom: 32,
              resizeMode: 'contain',
              height: 150,
            }}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};
