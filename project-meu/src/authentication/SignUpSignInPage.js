import React from 'react';
import {
  SafeAreaView, StyleSheet, Text,
} from 'react-native';
import Button from '../components/Button';
import SignUpGraphic from '../components/SignUpGraphic';

function SignupSigninPage(props) {
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
    fontFamily: 'SFProDisplay-Regular',
    left: 88,
    color: 'rgba(0,0,0,1)',
  },
  SignInText: {
    fontFamily: 'SFProDisplay-Semibold',
    left: 249,
    color: 'rgba(230, 43, 133, 1)',
  },
});

export default SignupSigninPage;
