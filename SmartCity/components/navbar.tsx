import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import des images pour les icônes
const listIcon = require('../assets/images/icon.png');
const homeIcon = require('../assets/images/icon.png');
const userIcon = require('../assets/images/icon.png');

const Navbar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home'); // State to keep track of the active tab

  // Function to handle navigation and set active tab
  const handleNavigation = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handleNavigation('List')}>
        <View style={[styles.iconContainer, activeTab === 'List' && styles.activeIconContainer]}>
          <Image source={listIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <View style={[styles.centerIconContainer, activeTab === 'Home' && styles.activeCenterIconContainer]}>
          <Image source={homeIcon} style={styles.centerIcon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <View style={[styles.iconContainer, activeTab === 'Profile' && styles.activeIconContainer]}>
          <Image source={userIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2f494F',
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  activeIconContainer: {
    backgroundColor: '#6fc18a',
    borderRadius: 30, 
  },
  centerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginTop: 0, 
  },
  activeCenterIconContainer: {
    backgroundColor: '#6fc18a',
    borderRadius: 40, 
    width: 80, 
    height: 80, 
    marginTop: 0, 
  },
  icon: {
    width: 24,
    height: 24,
  },
  centerIcon: {
    width: 28,
    height: 28,
  },
});

export default Navbar;
