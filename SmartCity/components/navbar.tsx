import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import des images pour les icônes
const listIcon = require('../assets/images/icon.png');
const homeIcon = require('../assets/images/icon.png');
const userIcon = require('../assets/images/icon.png');

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <Image source={listIcon} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.centerIconContainer}>
          <Image source={homeIcon} style={styles.centerIcon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={userIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2F4247',
    height: 70,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  centerIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#6ECB63', // Green circle for the home icon
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30, // Makes the icon float over the tab bar
  },
  centerIcon: {
    width: 28,
    height: 28,
  },
});

export default Navbar;