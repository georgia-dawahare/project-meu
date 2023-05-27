/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

function Button({ onPress, title, buttonStyle }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SF-Pro-Display-Semibold',

    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    height: 56,
    width: 300,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Button;
