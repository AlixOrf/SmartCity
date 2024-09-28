import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ajout from '../components/ajout'; 

interface PlusInfoProps {
  marker: any;
  modalVisible: boolean;
  closeModal: () => void;
  handleButtonPress: () => void; // Nouvelle prop pour gérer la popup Ajout
}

const PlusInfo: React.FC<PlusInfoProps> = ({ marker, modalVisible, closeModal, handleButtonPress }) => {
  const navigation = useNavigation();
  const [isAjoutVisible, setIsAjoutVisible] = useState(false); // Nouvel état pour gérer l'affichage de Ajout

  const openAjout = () => {
    setIsAjoutVisible(true); // Ouvre Ajout
  };

  const closeAjout = () => {
    setIsAjoutVisible(false); // Ferme Ajout
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {marker ? (
            <>
              <Text style={styles.modalTitle}>{marker.name}</Text>
              <Text style={styles.modalText}>
                Adresse : {marker.adresse}{"\n"}
                Téléphone: {marker.téléphone}{"\n"}
                Site Internet: {marker.site}
              </Text>

              <TouchableOpacity style={styles.addButton} onPress={openAjout}>
                <Text style={styles.addButtonText}>Ajouter Information</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeText}>Fermer</Text>
              </TouchableOpacity>

              {/* Affichage conditionnel de Ajout */}
              {isAjoutVisible && (
                <Ajout
                  isVisible={isAjoutVisible} // Utilise isAjoutVisible pour gérer l'affichage
                  onSave={(data) => { console.log('Données ajoutées:', data); closeAjout(); }} // Fonction de sauvegarde
                  onClose={closeAjout} // Fonction de fermeture
                  name={marker.name} // Passe le nom du marker
                />
              )}
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
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PlusInfo;
