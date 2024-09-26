import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions, ScrollView } from 'react-native';

interface AjoutProps {
  isVisible: boolean;
  onClose: () => void;
}

const Ajout: React.FC<AjoutProps> = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal transparent={true} visible={isVisible} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalTitle}>Comment se passe votre visite ?</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Temps d'attente</Text>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>- de 30min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>30min à 3H</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>+ de 3H</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fréquentation</Text>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Peu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Moyen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Important</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fermeture</Text>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Signalé</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Accident</Text>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Signalé</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Réduction</Text>
              <TouchableOpacity style={styles.buttonLightGray}>
                <Text style={styles.buttonText}>Signalé</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding to avoid content cutting off at the bottom
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonLightGray: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Ajout;
