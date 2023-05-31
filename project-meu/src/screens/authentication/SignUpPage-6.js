/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../../components/Button';

// need to add draggable selector

function SignupPage6(props) {
  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/icons/goback-black.png')}
        style={styles.Icon}
      />
      <Image
        source={require('../../assets/images/progress-3.png')}
        style={styles.progress}
      />

      <Text style={styles.Text}>Customize your Penguin.</Text>

      <Image
        source={require('../../assets/images/PenguinCumstomize.png')}
        style={styles.Penguin}
      />

      <Button title="Let's Start" buttonStyle={{ top: 680, left: 45 }} />

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
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
  Penguin: {
    width: 332,
    height: 255,
    top: 244,
    alignSelf: 'center',
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

export default SignupPage6;
