import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import { markers } from '../assets/markers'
import Navbar from '../components/navbar';

export default function App() {
  const [location, setLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const mapRef = useRef<any> ();
  const navigation =useNavigation();
  
  const INITIAL_REGION = {
    latitude: 48.8566, 
    longitude: 2.3522, 
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  useEffect(() => {
    navigation.setOptions ({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{padding: 10}}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      )
    })
  })

  const focusMap = () => {
    // Entrer ici là ou on veut faire le focus donc ce que renvoie la barre de recherche
    const là = {
      latitude: 48.8566, 
      longitude: 2.3522, 
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
    mapRef.current?.animateCamera({center: là, zoom: 10}, {duration: 3000})
  } 

  const onMarkerSelected = (marker:any) => {
    Alert.alert(marker.name);
  }

  const mapStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "poi.business",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "poi.park",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [{ "visibility": "off" }]
    }
  ]

  const MAX_DISTANCE = 500;
  
  return (
    <View style={{ flex: 1 }}>

    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}  
      initialRegion={INITIAL_REGION}
      showsMyLocationButton={false} 
      customMapStyle={mapStyle}  
      ref={mapRef}
      toolbarEnabled={false}
      mapPadding={{ top: 0, left: 50, right: 0, bottom: 20 }}
    >
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker} onPress={() => onMarkerSelected(marker)} />
      ))}

      {location && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Vous êtes ici"
          pinColor="blue"
        />
      )}
    </MapView>

      {errorMsg ? <Text>{errorMsg}</Text> : null}

      <Navbar />
    </View>
  );
}