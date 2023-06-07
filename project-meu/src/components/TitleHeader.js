/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Font from 'expo-font';

function TitleHeader({ title }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.topTitle}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 100,
  },
  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default TitleHeader;
