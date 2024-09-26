import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

interface AjoutProps {
  isVisible: boolean;
  onClose: () => void;
}

const Ajout: React.FC<AjoutProps> = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current; // Position initiale hors de l'écran à droite

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Le popup arrive à sa position finale (visible)
        duration: 300, // Durée de l'animation
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width, // Le popup sort par la droite
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
          <Text style={styles.modalText}>Ceci est une popup qui glisse depuis la droite !</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Aligner la popup sur le côté droit
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalContent: {
    width: 250,
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
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
