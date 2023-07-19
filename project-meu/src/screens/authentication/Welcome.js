/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import Button from '../../components/Button';

function Welcome({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleNext = async () => {
    navigation.navigate('CreatePair');
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <Image
        source={require('../../../assets/animations/confetti/confetti_black.gif')}
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>Welcome to MeU!</Text>
      <TouchableOpacity onPress={handleNext}>
        <Button title="Let&apos;s start" buttonStyle={{ top: 500, left: 45 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BannerImg: {
    position: 'absolute',
    width: 342,
    height: 329,
    alignSelf: 'center',
    left: 50,
    top: 240,
  },
  Title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 34,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    lineHeight: 41,
    top: 140,
  },
});

export default Welcome;
