import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../../components/Button';
import RegistrationInput from '../../components/RegistrationInput';
import SignUpGraphic from '../../components/SignUpGraphic';

function SigninPage(props) {
  return (
    <SafeAreaView>
      <Image
        // eslint-disable-next-line global-require
        source={require('../../../assets/icons/x-white.png')}
        style={styles.Icon}
      />
      <SignUpGraphic />
      <Button title="Sign Up" buttonStyle={{ top: 517, left: 45 }} />
      <RegistrationInput
        placeholder="Enter your email"
        top={340}
      />
      <RegistrationInput
        placeholder="Enter your Password"
        top={413}
      />
      <Text style={styles.ForgotPassword}>Forgot Password?</Text>
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
  ForgotPassword: {
    position: 'absolute',
    color: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    weight: 400,
    letterSpacing: 1,
    alignSelf: 'center',
  },
});

export default SigninPage;
