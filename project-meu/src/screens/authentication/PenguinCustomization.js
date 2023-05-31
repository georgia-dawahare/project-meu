/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import Button from '../../components/Button';

// need to add draggable selector

function PenguinCustomization({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
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
      <Image
        source={require('../../../assets/icons/goback-black.png')}
        style={styles.Icon}
      />
      <Image
        source={require('../../../assets/images/progress-3.png')}
        style={styles.progress}
      />

      <Text style={styles.Text}>Customize your Penguin.</Text>

      <Image
        source={require('../../../assets/images/PenguinCumstomize.png')}
        style={styles.Penguin}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Button title="Let's Start" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Icon: {
    position: 'absolute',
    top: 32,
    left: 24,
    height: 24,
    zIndex: 2,
  },
  progress: {
    width: 70,
    height: 10,
    top: 160,
    alignSelf: 'center',
  },
  Text: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
  Penguin: {
    width: 332,
    height: 255,
    top: 244,
    alignSelf: 'center',
  },
  Subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 225,
    textAlign: 'center',
    top: 600,
  },
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PenguinCustomization;
