import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdjpclijdqwtcnummjuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Masqué pour concision
const supabase = createClient(supabaseUrl, supabaseKey);

interface MuseumData {
  name: string;
  "temps d’attente": string;
  Fréquentation: string;
  Fermeture: boolean;
  Accident: boolean;
  Réduction: boolean;
}

interface AjoutProps {
  isVisible: boolean;
  onSave: (data: MuseumData) => void;
  onClose: () => void;
  name: string; // Nouvelle prop pour le nom
}

const Ajout: React.FC<AjoutProps> = ({ isVisible, onSave, onClose, name }) => {
  const [waitingTime, setWaitingTime] = useState('- de 30min');
  const [frequentationValue, setFrequentation] = useState('Peu');
  const [fermeture, setFermeture] = useState(false);
  const [accident, setAccident] = useState(false);
  const [reduction, setReduction] = useState(false);

  const handleSave = async () => {
    const museumData: MuseumData = {
      name,
      "temps d’attente": waitingTime,
      Fréquentation: frequentationValue,
      Fermeture: fermeture,
      Accident: accident,
      Réduction: reduction,
    };

    const { data, error } = await supabase
      .from('museums')
      .insert([museumData]);

    if (error) {
      console.error('Erreur lors de l\'insertion:', error);
    } else {
      console.log('Données sauvegardées avec succès:', data);
      onSave(museumData);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.label}>Nom du musée: {name}</Text>

            <Text style={styles.label}>Temps d'attente</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button, 
                  waitingTime === '- de 30min' && styles.buttonSelected
                ]}
                onPress={() => setWaitingTime('- de 30min')}
              >
                <Text style={waitingTime === '- de 30min' ? styles.buttonTextSelected : styles.buttonText}>
                  - de 30min
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button, 
                  waitingTime === '30-60min' && styles.buttonSelected
                ]}
                onPress={() => setWaitingTime('30-60min')}
              >
                <Text style={waitingTime === '30-60min' ? styles.buttonTextSelected : styles.buttonText}>
                  30-60min
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Fréquentation</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  frequentationValue === 'Peu' && styles.buttonSelected
                ]}
                onPress={() => setFrequentation('Peu')}
              >
                <Text style={frequentationValue === 'Peu' ? styles.buttonTextSelected : styles.buttonText}>
                  Peu
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  frequentationValue === 'Modérée' && styles.buttonSelected
                ]}
                onPress={() => setFrequentation('Modérée')}
              >
                <Text style={frequentationValue === 'Modérée' ? styles.buttonTextSelected : styles.buttonText}>
                  Modérée
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  frequentationValue === 'Beaucoup' && styles.buttonSelected
                ]}
                onPress={() => setFrequentation('Beaucoup')}
              >
                <Text style={frequentationValue === 'Beaucoup' ? styles.buttonTextSelected : styles.buttonText}>
                  Beaucoup
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Fermeture</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  fermeture && styles.buttonSelected
                ]}
                onPress={() => setFermeture(true)}
              >
                <Text style={fermeture ? styles.buttonTextSelected : styles.buttonText}>
                  Oui
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  !fermeture && styles.buttonSelected
                ]}
                onPress={() => setFermeture(false)}
              >
                <Text style={!fermeture ? styles.buttonTextSelected : styles.buttonText}>
                  Non
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Accident</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  accident && styles.buttonSelected
                ]}
                onPress={() => setAccident(true)}
              >
                <Text style={accident ? styles.buttonTextSelected : styles.buttonText}>
                  Oui
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  !accident && styles.buttonSelected
                ]}
                onPress={() => setAccident(false)}
              >
                <Text style={!accident ? styles.buttonTextSelected : styles.buttonText}>
                  Non
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Réduction</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  reduction && styles.buttonSelected
                ]}
                onPress={() => setReduction(true)}
              >
                <Text style={reduction ? styles.buttonTextSelected : styles.buttonText}>
                  Oui
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  !reduction && styles.buttonSelected
                ]}
                onPress={() => setReduction(false)}
              >
                <Text style={!reduction ? styles.buttonTextSelected : styles.buttonText}>
                  Non
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFF1',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '70%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#2F494F',
    marginVertical: 10,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ADB6BC',
  },
  buttonSelected: {
    backgroundColor: '#6FC18A', // Vert pour les boutons sélectionnés
  },
  buttonText: {
    color: '#2F494F', // Texte sombre pour les boutons non sélectionnés
  },
  buttonTextSelected: {
    color: '#FFFFF1', // Texte clair pour les boutons sélectionnés
  },
  saveButton: {
    backgroundColor: '#6FC18A',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFF1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#E9534E',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFFFF1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Ajout;
