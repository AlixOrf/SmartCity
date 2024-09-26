import { Stack } from 'expo-router';
import React from 'react'; 

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="list" options={{ title: 'List' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
};

export default Layout;
