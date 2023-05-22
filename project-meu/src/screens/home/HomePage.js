/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';
import SignUpGraphic from '../../components/SignUpGraphic';

function HomePage() {
  // Example font loading
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),

      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <SignUpGraphic />
      <Text style={styles.signInText}>hello</Text>
    </SafeAreaView>
  );
}

// Example StyleSheet
const styles = StyleSheet.create({
  signInText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'rgba(230, 43, 133, 1)',
  },
});

export default HomePage;
