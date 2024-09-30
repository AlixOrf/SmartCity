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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '50%',
    backgroundColor: '#FFFFF1', // Fond principal clair
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F494F', // Titre sombre pour contraste
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#2F494F', // Texte principal sombre
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6FC18A', // Vert agréable
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFF1', // Contraste clair
    fontSize: 16,
    fontWeight: '600',
  },
  closeText: {
    fontSize: 16,
    color: '#E9534E', // Rouge pour le bouton fermer
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PlusInfo;
