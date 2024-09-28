import React, { useState } from 'react'; 
import { View, Button, Text, StyleSheet, Modal, ScrollView } from 'react-native';
// Importation de Supabase
import { createClient } from '@supabase/supabase-js';

// Remplacez ces valeurs par les vôtres
const supabaseUrl = 'https://sdjpclijdqwtcnummjuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkanBjbGlqZHF3dGNudW1tanVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MjAwNDMsImV4cCI6MjA0MzA5NjA0M30.MudPq_diGL_YiK46603IO24opKgUbZIG8QEV8GZxRfw';
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

    // Enregistrement des données dans Supabase
    const { data, error } = await supabase
      .from('museums') // Assurez-vous que la table s'appelle 'museums'
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
              <Button title="- de 30min" onPress={() => setWaitingTime('- de 30min')} />
              <Button title="30-60min" onPress={() => setWaitingTime('30-60min')} />
            </View>

            <Text style={styles.label}>Fréquentation</Text>
            <View style={styles.buttonGroup}>
              <Button title="Peu" onPress={() => setFrequentation('Peu')} />
              <Button title="Modérée" onPress={() => setFrequentation('Modérée')} />
              <Button title="Beaucoup" onPress={() => setFrequentation('Beaucoup')} />
            </View>

            <Text style={styles.label}>Fermeture</Text>
            <View style={styles.buttonGroup}>
              <Button title="Oui" onPress={() => setFermeture(true)} />
              <Button title="Non" onPress={() => setFermeture(false)} />
            </View>

            <Text style={styles.label}>Accident</Text>
            <View style={styles.buttonGroup}>
              <Button title="Oui" onPress={() => setAccident(true)} />
              <Button title="Non" onPress={() => setAccident(false)} />
            </View>

            <Text style={styles.label}>Réduction</Text>
            <View style={styles.buttonGroup}>
              <Button title="Oui" onPress={() => setReduction(true)} />
              <Button title="Non" onPress={() => setReduction(false)} />
            </View>

            <View style={styles.buttonGroup}>
              <Button title="Enregistrer" onPress={handleSave} />
              <Button title="Annuler" onPress={onClose} />
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
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan semi-transparent
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '70%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default Ajout;
