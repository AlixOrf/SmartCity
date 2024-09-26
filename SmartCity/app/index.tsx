import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { info } from '../assets/infodata';
import Navbar from '../components/navbar';
import PlusInfo from '../components/plusinfo';
import Ajout from '../components/ajout'; // Importer le composant Ajout
import { SearchBar } from 'react-native-elements'; // Import de la Search Bar
import { useNavigation } from '@react-navigation/native'; // Import pour gérer les options de navigation

export default function App() {
  const [location, setLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState(info);

  const mapRef = useRef<any>();
  const navigation = useNavigation(); // Hook pour accéder à la navigation

  const INITIAL_REGION = {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  useEffect(() => {
    // Masquer le header par défaut
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const updateSearch = (searchText: string) => {
    setSearch(searchText);

    const filtered = info.filter(marker => {
      const markerName = marker.name ? marker.name.toLowerCase() : '';
      return markerName.includes(searchText.toLowerCase());
    });

    setFilteredMarkers(filtered);

    if (filtered.length === 1) {
      const { latitude, longitude } = filtered[0];
      focusMap(latitude, longitude);
    }
  };

  const focusMap = (latitude: number, longitude: number) => {
    mapRef.current?.animateCamera({
      center: { latitude, longitude },
      zoom: 15,
    }, { duration: 1000 });
  };

  const onMarkerSelected = (marker: any) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarker(null);
  };

  const handleButtonPress = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Rechercher..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        customMapStyle={[
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
          { featureType: 'poi.park', stylers: [{ visibility: 'off' }] },
          { featureType: 'poi.attraction', stylers: [{ visibility: 'off' }] },
        ]}
        ref={mapRef}
      >
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={marker.name}
            onPress={() => onMarkerSelected(marker)}
          />
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

      <Navbar />

      <PlusInfo marker={selectedMarker} modalVisible={modalVisible} closeModal={closeModal} />

      <TouchableOpacity style={styles.roundButton} onPress={handleButtonPress}>
        <Image source={require('../assets/images/icon.png')} style={styles.icon} />
      </TouchableOpacity>

      <Ajout isVisible={isPopupVisible} onClose={closePopup} />
    </View>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    position: 'absolute',
    top: 15,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
  },
});
