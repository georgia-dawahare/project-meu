/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View,
} from 'react-native';
import * as Font from 'expo-font';
import {
  getAuth, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { useSelector } from 'react-redux';

function Welcome() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const auth = getAuth();
  const currUser = useSelector((state) => state.userState.userData);
  const password = useSelector((state) => state.passwordState.password);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const signOutUser = async () => {
    signOut(auth).then(() => {
      console.log('Successfully logged out. See you later!');
    }).catch((e) => {
      console.log('Error signing out: ', e);
    });
  };

  const triggerOnAuthState = async () => {
    signOutUser();
    signInWithEmailAndPassword(auth, currUser.email, password)
      .then(() => {
        // Signed in
        console.log('Signed in');
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleNext = async () => {
    triggerOnAuthState();
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to MeU!</Text>
        <Image
          source={require('../../../assets/animations/confetti/confetti_black.gif')}
          style={styles.celebrationPenguin}
        />
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.btn}>
        <Text style={styles.btnTxt}>
          Let&apos;s start
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  celebrationPenguin: {
    width: 450,
    height: 350,
  },
  title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 34,
    lineHeight: 41,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    height: 56,
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
});

export default Welcome;
