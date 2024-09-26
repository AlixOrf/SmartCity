import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { markers } from '../assets/markers'; // Assurez-vous que le chemin est correct
import Navbar from '../components/navbar';
import { SearchBar } from 'react-native-elements'; // Import de la Search Bar

export default function App() {
  const [location, setLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

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

  // Fonction pour mettre à jour la recherche
  const updateSearch = (searchText: string) => {
    setSearch(searchText);
  
    // Filtrer les markers uniquement par le nom
    const filtered = markers.filter(marker => {
      const markerName = marker.name ? marker.name.toLowerCase() : ''; // Vérification que `name` existe
      return markerName.includes(searchText.toLowerCase());
    });
  
    setFilteredMarkers(filtered);
  };
  
  

  return (
    <View style={styles.container}>
      {/* Barre de recherche placée en haut de l'écran */}
      <SearchBar
        placeholder="Rechercher..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      {/* Carte avec markers filtrés */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location ? location.latitude : 48.8566, // Paris par défaut si location non disponible
          longitude: location ? location.longitude : 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredMarkers.map((marker) => (
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.name}
          />
        ))}
      </MapView>

      {/* Navigation Bar (si applicable) */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1, // S'assurer que la barre de recherche est au-dessus de la carte
  },
  searchInputContainer: {
    backgroundColor: '#fff',
  },
});

