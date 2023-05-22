import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../components/Button';
import RegistrationInput from '../components/RegistrationInput';

function SignupPage5(props) {
  return (
    <SafeAreaView>
      <Image
        source="../assets/icons/goback-black.png"
        style={styles.Icon}
      />
      <Image
        source="../assets/images/progress-3.png"
        style={styles.progress}
      />

      <Text style={styles.Text}>Successfully Connected! Please fill out your profile.</Text>

      <RegistrationInput
        placeholder="Name"
        top={320}
      />
      <RegistrationInput
        placeholder="Birthday(MM/DD/YYYY)"
        top={393}
      />
      <RegistrationInput
        placeholder="Our First Day(Optional)"
        top={466}
      />

      <Button title="Next" buttonStyle={{ top: 559, left: 45 }} />
      <Text style={styles.Subtitle}>The information can be seen on your partner’s MeU, and all the information you entered will be used only for service optimization</Text>

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
  Subtitle: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 225,
    textAlign: 'center',
    top: 600,
  },
});

export default SignupPage5;
