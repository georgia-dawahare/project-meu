/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, Image,
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
    <View>
      <Image
        source={require('../../assets/signup-vector.png')}
        style={styles.signUpVector}
      />
      <Text style={styles.welcomeTxt}>
        Welcome to
        {'\n'}
        MeU
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  signUpVector: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  welcomeTxt: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 28,
    letterSpacing: 1,
    marginLeft: 27,
    marginTop: 100,
    fontFamily: 'SF-Pro-Display-Bold',
  },
});

export default SignUpGraphic;
