import React from 'react';
import {
  SafeAreaView, StyleSheet, Image,
} from 'react-native';
import SignUpGraphic from '../components/SignUpGraphic';

function SignupTermAgreementPage(props) {
  return (
    <SafeAreaView>
      <Image
        // eslint-disable-next-line global-require
        source={require('../assets/icons/x-white.png')}
        style={styles.Icon}
      />
      <SignUpGraphic />
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
});

export default SignupTermAgreementPage;
