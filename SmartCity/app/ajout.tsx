import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  // Animated value for the slide effect
  const slideAnim = new Animated.Value(screenWidth); // Starts from the right side

  const openPopup = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide into view
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth, // Slide out to the right
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Button to open the popup */}
      <TouchableOpacity style={styles.openButton} onPress={openPopup}>
        <Text style={styles.buttonText}>Open Popup</Text>
      </TouchableOpacity>

      {/* Modal popup */}
      <Modal transparent visible={isVisible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={closePopup}>
          <TouchableOpacity activeOpacity={1} style={styles.modalInnerContainer}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
              <Text style={styles.modalTitle}>Sliding Popup</Text>
              <Text>This popup slides from the right!</Text>

              <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalInnerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalContent: {
    backgroundColor: '#fff',
    height: '100%',
    width: '75%', // Width of the popup
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
    position: 'absolute',
    right: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
