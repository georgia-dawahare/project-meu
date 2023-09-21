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
        'SF-Pro-Display-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
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
    <View>
      <Image
        source={require('../../assets/images/signupVector.png')}
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
    fontFamily: 'SF-Pro-Display-Semibold',
    textAlign: 'center',
    color: '#E62B85',
    fontSize: 28,
    letterSpacing: 1,
    marginLeft: 27,
    marginTop: 100,
  },
});

export default SignUpGraphic;
