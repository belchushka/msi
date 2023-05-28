import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {View, Text, ScrollView, Dimensions, Image, ActivityIndicator} from 'react-native';
import YaMap, { Marker } from 'react-native-yamap';
import SchoolIcon from '@assets/images/school_icon.png'
import BottomSheet from '@gorhom/bottom-sheet';
import { $authHost, $host } from '@/shared/api';



export const MapPage = () => {

    const [schoolsCoords, setSchoolsCoords] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState<any>(null)

    useEffect(()=>{
        (async ()=>{
            
          const newScoolCords = []

          for (let i=303; i<=453; i++){
            const {data} = await $authHost.get('/parse/school', {params: {id: i}});

            if (data.data.coordinates[0].length>0){
                const schoolName = data.data.name

                const chunks = data.data.chunks.data
                const options = []

                for (let j = 0; j < chunks[0].length; j++){
                    const currentChunk = chunks[0][j][0];
                    if (currentChunk != null && currentChunk.length > 3 && !options.includes(currentChunk)){
                        options.push(currentChunk)
                    }
                }
                newScoolCords.push({"coords": data.data.coordinates[0].split(", ").map(str => parseFloat(str)), "id" : i, "name": schoolName, "options": options});
                
            }
          }

          setSchoolsCoords(newScoolCords);
          console.log(newScoolCords)
          console.log(newScoolCords.length)

        })()
    },[])


    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '30%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    console.log(schoolsCoords)

    if (schoolsCoords.length != 11){
        return <ActivityIndicator/>
    }

    return (
        <View style={{flex: 1}}>
            <YaMap  initialRegion={{
                lat: 55.75,
                lon: 37.6,
                zoom: 10,
                azimuth: 80,
                tilt: 100
            }}   showUserPosition mapType='vector' style={{flex: 1}}>           
                
        
                
                {schoolsCoords.map((school, i)=>{
                    console.log("works")
                    return <Marker point={{ lat: school["coords"][0], lon: school["coords"][1] }} onPress={()=>{
                        setSelectedSchool(schoolsCoords[i])
                        bottomSheetRef.current.expand()
                    }}>
                        <Image source={SchoolIcon} style={{width: 40, height: 40}}/>
                    </Marker>
                })}
            
            </YaMap>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                {selectedSchool==null ? 
                    <View>
                        
                    </View>
                : 
                <View style={{padding: 12}}>
                    <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>{selectedSchool != null ? selectedSchool["name"] : ""} </Text>
                    <Text style={{color: '#A4CE57', fontSize: 18, paddingTop: 8}}>Направления обучения</Text>
                    <Text style={{color: "black", fontSize: 18, paddingTop: 8}}>{selectedSchool != null ? "- "+selectedSchool["options"].join("\n\n- ") : ""}</Text>
                </View>
            }
            </BottomSheet>
        </View>
    );
};
