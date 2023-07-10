import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../../components/Button';
import SignUpGraphic from '../../components/SignUpGraphic';

function SigninForgotPasswordPage2() {
  return (
    <SafeAreaView>
      <Image
        // eslint-disable-next-line global-require
        source={require('../../assets/icons/x-white.png')}
        style={styles.Icon}
      />
      <SignUpGraphic />
      <Text style={styles.Text}>Thank you! - if you have a MeU accout, we&apos;ve sent you an email!</Text>
      <Button title="Done" buttonStyle={{ top: 465, left: 45 }} />
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
  Text: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 355,
  },
});

export default SigninForgotPasswordPage2;
