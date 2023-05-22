import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../components/Button';
import RegistrationInput from '../components/RegistrationInput';

function SignupPage1(props) {
  return (
    <SafeAreaView>
      <Image
        source="../assets/icons/goback-black.png"
        style={styles.Icon}
      />
      <Image
        source="../assets/images/progress-1.png"
        style={styles.progress}
      />

      <Text style={styles.Text}>Nice to Meet you! Please enter information to join MeU.</Text>

      <RegistrationInput
        placeholder="Enter your email"
        top={320}
      />
      <RegistrationInput
        placeholder="Enter your Password"
        top={393}
      />

      <Button title="Next" buttonStyle={{ top: 507, left: 45 }} />
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
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
});

export default SignupPage1;
