// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')} // Replace with your image file
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 32 }}>Loading...</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500, // Adjust the width and height as needed
    height: 500,
  },
});

export default SplashScreen;
