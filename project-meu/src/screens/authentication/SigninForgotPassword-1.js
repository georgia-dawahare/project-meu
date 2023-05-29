import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../../components/Button';
import RegistrationInput from '../../components/RegistrationInput';
import SignUpGraphic from '../../components/SignUpGraphic';

function SigninForgotPasswordPage1() {
  return (
    <SafeAreaView>
      <Image
        souce="../assets/icons/x-white.png"
        style={styles.Icon}
      />
      <SignUpGraphic />

      <Text style={styles.Title}>Forgot Password?</Text>
      <Text style={styles.Subtitle}>We need to confirm your email to send you instructions to reset the password.</Text>
      <RegistrationInput
        placeholder="Enter your email"
        top={372}
      />
      <Button title="Reset Password" buttonStyle={{ top: 485, left: 45 }} />
      <Text style={styles.GoBack}>Go back to Sign In</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Icon: {
    position: 'absolute',
    top: 32,
    left: 342,
    height: 24,
    zIndex: 2,
  },
  Title: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 18,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    top: 267,

  },
  Subtitle: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 285,
  },
  GoBack: {
    position: 'absolute',
    top: 565,
    color: 'rgba(0,0,0, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 16,
    letterSpacing: 1,
    alignSelf: 'center',
  },
});

export default SigninForgotPasswordPage1;
