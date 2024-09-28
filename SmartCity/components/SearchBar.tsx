import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const SearchBar = ({ markers = [], onSelection }: { markers: any[], onSelection: (marker: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Vérifier que markers n'est pas undefined
  const filteredMarkers = markers.filter(marker =>
    marker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marker.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingLeft: 8,
          marginBottom: 10,
        }}
        placeholder="Rechercher..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredMarkers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelection(item)}>
            <Text style={{ padding: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchBar;
