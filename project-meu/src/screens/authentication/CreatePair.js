/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '../../components/Button';
import RegistrationInput from '../../components/RegistrationInput';
import SignupShareButton from '../../components/SignUpShareButton';
import { apiUrl } from '../../constants/constants';

function CreatePair({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [code, setCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isPairCreator, setIsPairCreator] = useState(false);
  const [currUserId, setCurrUserId] = useState('');
  const [newPairId, setNewPairId] = useState('');
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid } = user;
        setCurrUserId(uid);
      } else {
        // User is signed out
      }
    });
  }, []);

  const generateCode = () => {
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      randomCode += randomNumber.toString();
    }
    randomCode = '1234566';
    return randomCode;
  };

  const handleNext = async () => {
    if (newPairId) {
      navigation.navigate('ProfileInfo');
    }
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleCreatePair = async () => {
    setIsPairCreator(true);
    const newCode = generateCode();
    setCode(newCode);
    await axios.update(`${apiUrl}/users/${currUserId}`, { code });
  };

  const handleConnect = async () => {
    setIsPairCreator(false);
    if (inputCode) {
      try {
        const data = {
          userCode: '123456',
          isPairCreator: false,
          relationshipStart: '12/02/22',
        };
        const pairId = await axios.get(`${apiUrl}/users/code/${currUserId}`, data);
        if (pairId) {
          setNewPairId(pairId);
          console.log('Successfully paired!');
        }
      } catch (e) {
        console.log('Failed to pair');
      }
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/icons/goback-black.png')}
          style={styles.goback}
        />
      </TouchableOpacity>
      <Image
        source={require('../../../assets/images/progress-3.png')}
        style={styles.progress}
      />

      <Text style={styles.Title}>
        Please create a pair or enter a pair code to connect!
      </Text>
      {isPairCreator ? (
        <View>
          <View style={styles.mycodeContainer}>
            <Text style={styles.partnerTitle}>
              My Invitation Code
              {' '}
              {code}
            </Text>
            <RegistrationInput
              placeholder={code}
              top={20}
              textAlign="flex-start"
              editable={false}
            />
            <SignupShareButton />
          </View>
          <TouchableOpacity onPress={handleNext}>
            <Button title="Next" buttonStyle={{ top: 400, left: 45 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.mycodeContainer}>
            <Text style={styles.partnerTitle}>
              Did you receive your partner&apos;s pair code?
            </Text>
            <RegistrationInput
              placeholder="Enter the Code"
              top={20}
              textAlign="flex-start"
              onChangeText={(text) => setInputCode(text)}
            />
            <TouchableOpacity style={styles.connect} onPress={handleConnect}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.createPairText}>
            If not, create a pair and send the code to your partner
          </Text> */}
          <TouchableOpacity onPress={handleCreatePair}>
            <Button title="Create Pair" buttonStyle={{ top: 400, left: 45 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // connect: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   marginTop: 30,
  // },
  connectButtonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    alignItems: 'center',
    fontSize: 14,
    color: '#ffffff',
  },
  connect: {
    width: 72,
    height: 28,
    backgroundColor: 'rgba(230, 43, 133, 1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    left: 278,
  },
  goback: {
    position: 'absolute',
    top: 50,
    left: 25,
    height: 24,
    zIndex: 2,
  },
  progress: {
    width: 70,
    height: 10,
    top: 160,
    alignSelf: 'center',
  },
  Title: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
  input: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  mycodeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: 280,
  },
  partnerTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    color: 'rgba(51,51,51,1)',
    left: 46,
    marginBottom: 15,
  },
  createPairText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    color: 'rgba(51,51,51,1)',
    left: 50,
    top: 600,
  },
});

export default CreatePair;
