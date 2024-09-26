import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PlusInfoProps {
  marker: any;
  modalVisible: boolean;
  closeModal: () => void;
}

const PlusInfo: React.FC<PlusInfoProps> = ({ marker, modalVisible, closeModal }) => {
  const navigation = useNavigation();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {marker ? (
            <>
              <Text style={styles.modalTitle}>{marker.name}</Text>
              <Text style={styles.modalText}>
                Latitude: {marker.latitude}, Longitude: {marker.longitude}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('PlusInfo', { marker })}>
                <Text style={styles.moreInfoText}>Plus d'infos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeText}>Fermer</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  moreInfoText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  closeText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PlusInfo;
