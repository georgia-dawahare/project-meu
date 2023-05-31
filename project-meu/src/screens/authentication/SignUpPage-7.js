/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../../components/Button';

function SignupPage7(props) {
  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/images/Onboarding.png')}
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>Welcome to MeU</Text>
      <Button title="Go to MainPage" buttonStyle={{ top: 640, left: 45 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BannerImg: {
    position: 'absolute',
    width: 342,
    height: 329,
    alignSelf: 'center',
    top: 240,
  },
  Title: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 34,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    lineHeight: 41,
    top: 140,
  },
});

export default SignupPage7;
