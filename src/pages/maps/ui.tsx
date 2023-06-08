import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import YaMap, {Marker} from 'react-native-yamap';
import SchoolIcon from '@assets/images/school_icon.png';
import BottomSheet from '@gorhom/bottom-sheet';
import {$authHost} from '@/shared/api';
import {useTheme} from '@/shared/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '@/shared/ui';

export const MapPage = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<any>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();

  // variables
  const snapPoints = useMemo(() => ['1%', '30%', '60%'], []);

  // callbacks
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

  console.log(schools);
  return (
    <View style={{flex: 1}}>
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
                setSelectedSchoolId(i);
                bottomSheetRef.current.expand();
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
              variant="primary">
              Записаться на занятие
            </Button>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};
