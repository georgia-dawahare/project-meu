/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text,
} from 'react-native';
import * as Font from 'expo-font';
import Button from '../components/Button';
import SignUpGraphic from '../components/SignUpGraphic';

function SignupSigninPage(props) {
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
    <SafeAreaView>
      <SignUpGraphic />
      <Button title="Sign Up" buttonStyle={{ top: 400, left: 45 }} />
      <Text style={styles.SignInContainer}>
        <Text style={styles.Already}>Already have an ID?</Text>
        <Text style={styles.SignInText}>    Sign In</Text>
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SignInContainer: {
    position: 'absolute',
    top: 480,
    fontSize: 16,
    weight: 400,
    letterSpacing: 1,
    alignSelf: 'center',
  },
  Already: {
    fontFamily: 'SF-Pro-Display-Regular',
    left: 88,
    color: 'rgba(0,0,0,1)',
  },
  SignInText: {
    fontFamily: 'SF-Pro-Display-Semibold',
    left: 249,
    color: 'rgba(230, 43, 133, 1)',
  },
});

export default SignupSigninPage;
