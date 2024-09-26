import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { info } from '../assets/infodata';
import Navbar from '../components/navbar';
import PlusInfo from '../components/plusinfo';
import Ajout from '../components/ajout'; // Importer le composant Ajout
import { SearchBar } from 'react-native-elements'; // Import de la Search Bar

export default function App() {
  const [location, setLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false); // État pour gérer la visibilité de la popup Ajout
  const [search, setSearch] = useState(''); // Initialiser dans app pour Search bar
  const [filteredMarkers, setFilteredMarkers] = useState(info); // Initialisation avec les markers

  const mapRef = useRef<any>();
  const navigation = useNavigation();

  const INITIAL_REGION = {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  // Fonction pour mettre à jour la recherche
  const updateSearch = (searchText: string) => {
    setSearch(searchText);

    // Filtrer les markers par nom
    const filtered = info.filter(marker => {
      const markerName = marker.name ? marker.name.toLowerCase() : '';
      return markerName.includes(searchText.toLowerCase());
    });

    setFilteredMarkers(filtered);
  };

  const focusMap = () => {
    const là = {
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
    mapRef.current?.animateCamera({ center: là, zoom: 10 }, { duration: 3000 });
  };

  const onMarkerSelected = (marker: any) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarker(null);
  };

  const mapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.attraction',
      stylers: [{ visibility: 'off' }],
    },
  ];

  const handleButtonPress = () => {
    setPopupVisible(true); // Affiche la popup Ajout
  };

  const closePopup = () => {
    setPopupVisible(false); // Ferme la popup Ajout
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Barre de recherche */}
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
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        ref={mapRef}
        toolbarEnabled={false}
        mapPadding={{ top: 0, left: 50, right: 0, bottom: 20 }}
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