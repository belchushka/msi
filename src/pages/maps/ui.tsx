import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  Vibration,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import YaMap, {Marker} from 'react-native-yamap';
import SchoolIcon from '@assets/images/school_icon.png';
import BottomSheet from '@gorhom/bottom-sheet';
import {$authHost} from '@/shared/api';
import {useTheme} from '@/shared/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Container} from '@/shared/ui';

export const MapPage = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<any>(null);
  const ignoreNext = useRef(false);
  const [showModal, setShowModal] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();

  const snapPoints = useMemo(() => ['1%', '30%', '60%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await $authHost.get('/parse/fullexcel', {
          params: {
            excelid: 1,
          },
        });
        if (data.data.schools) {
          setSchools(
            data.data.schools.filter(
              (el: any) => el.coordinates !== 'null, null',
            ),
          );
        }
      } catch (e) {}
    })();
  }, []);

  const selectedSchool = useMemo(() => {
    if (selectedSchoolId) {
      return schools[selectedSchoolId];
    }
    return null;
  }, [schools, selectedSchoolId]);

  return (
    <View style={{flex: 1}}>
      <Modal
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        animationType="fade"
        transparent>
        <Container
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignSelf: 'stretch',
              gap: 12,
            }}>
            <Text
              style={{
                color: theme.colors.dark[800],
                fontSize: 28,
                fontFamily: 'DeeDee-Bold',
                marginBottom: 10,
              }}>
              Заявка
            </Text>
            <TextInput
              style={{
                color: 'black',
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 18,
                borderWidth: 1,
                borderColor: theme.colors.dark[100],
                borderRadius: 8,
                fontFamily: 'DeeDee',
              }}
              placeholderTextColor="black"
              placeholder="Имя"
            />
            <TextInput
              style={{
                color: 'black',
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 18,
                borderWidth: 1,
                borderColor: theme.colors.dark[100],
                borderRadius: 8,
                fontFamily: 'DeeDee',
                marginBottom: 10,
              }}
              placeholderTextColor="black"
              placeholder="Ваш номер телефона"
            />
            <Button
              onPress={() => {
                Alert.alert('Заявка успешно отправлена');
                setShowModal(false);
              }}
              variant="primary">
              Отправить
            </Button>
          </View>
        </Container>
      </Modal>
      <YaMap
        initialRegion={{
          lat: 55.75,
          lon: 37.6,
          zoom: 10,
          azimuth: 80,
          tilt: 100,
        }}
        showUserPosition
        mapType="vector"
        style={{flex: 1}}>
        {schools.map((school: any, i) => {
          const coords = school.coordinates
            .split(', ')
            .map(el => parseFloat(el));
          return (
            <Marker
              point={{lat: coords[0], lon: coords[1]}}
              onPress={() => {
                if (!ignoreNext.current) {
                  ignoreNext.current = true;
                  setSelectedSchoolId(i);
                  Vibration.vibrate(80);
                  bottomSheetRef.current.expand();
                  setTimeout(() => {
                    ignoreNext.current = false;
                  }, 1000);
                }
              }}>
              <Image source={SchoolIcon} style={{width: 40, height: 40}} />
            </Marker>
          );
        })}
      </YaMap>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {selectedSchool && (
          <View style={{padding: 12}}>
            <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
              {selectedSchool.name}{' '}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              {selectedSchool.address}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${selectedSchool.phone}`)}>
              <Text
                style={{
                  color: theme.colors.green.primary,
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {selectedSchool.phone}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              {selectedSchool.email}
            </Text>
            <Button
              style={{
                marginTop: 40,
              }}
              onPress={() => setShowModal(true)}
              variant="primary">
              Записаться на занятие
            </Button>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};
