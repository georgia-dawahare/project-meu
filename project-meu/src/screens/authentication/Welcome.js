/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../../components/Button';
import { apiUrl } from '../../constants/constants';

function Welcome({ navigation }) {
  const currUser = useSelector((state) => state.user);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleRegister = async () => {
    let userId;
    if (currUser.user_data.email && currUser.user_data.password) {
      await createUserWithEmailAndPassword(auth, currUser.user_data.email, currUser.user_data.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          if (user) {
            userId = user.uid;
            const userData = {
              email: currUser.user_data.email,
              userId,
              pairId: '',
              firstName: currUser.user_data.first_name,
              lastName: currUser.user_data.last_name,
              penguinColor: '',
              backgroundPhoto: '',
              birthday: currUser.user_data.birthday,
              code: '',
              lastSentEmotion: '0',
              partner_last_emotion: '0',
              city: '',
              user_last_emotion: '',
            };
            axios
              .post(`${apiUrl}/users/`, userData)
              .catch((e) => console.log(e.response));
          }
        })
        .catch((e) => {
          const errorMessage = e.message;
          // Format error message
          const message = errorMessage.split(':')[1].split('(')[0].trim();
          setError(message);
        });
    }
    if (userId) {
      navigation.navigate('CreatePair');
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <Image
        source={require('../../../assets/animations/confetti/confetti_black.gif')}
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>Welcome to MeU</Text>
      <TouchableOpacity onPress={handleRegister}>
        <Button title="Find Your Pair" buttonStyle={{ top: 500, left: 45 }} />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BannerImg: {
    position: 'absolute',
    width: 342,
    height: 329,
    alignSelf: 'center',
    left: 50,
    top: 240,
  },
  Title: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 34,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    lineHeight: 41,
    top: 140,
  },
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Welcome;
