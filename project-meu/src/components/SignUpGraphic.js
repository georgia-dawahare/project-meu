/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';

function SignUpGraphic() {
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
  },
});

export default SignUpGraphic;
