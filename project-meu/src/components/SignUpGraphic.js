/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import * as Font from 'expo-font';

function SignUpGraphic() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
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
        source={require('../../assets/signup-vector.png')}
        style={styles.SignupVector}
      />
      <Text style={styles.WelcomeMeU}>
        Welcome to
        {'\n'}
        MeU
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  SignupVector: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  WelcomeMeU: {
    position: 'absolute',
    top: 60,
    left: 27,
    color: '#ffffff',
    fontSize: 32,
    letterSpacing: 1,
    alignSelf: 'center',
    fontFamily: 'SF-Pro-Display-Bold',
  },
});

export default SignUpGraphic;
