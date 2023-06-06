/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View,
} from 'react-native';
import * as Font from 'expo-font';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import RegistrationInput from '../../components/RegistrationInput';
import { updateUser } from '../../actions';

function ProfileInfo({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [birthday, setBirthday] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleNext = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      anniversary,
      birthday,
    };
    dispatch(updateUser(newUser));
    navigation.navigate('Welcome');
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/icons/goback-black.png')}
          style={styles.Icon}
        />
      </TouchableOpacity>

      <Image
        source={require('../../../assets/images/progress-2.png')}
        style={styles.progress}
      />

      <Text style={styles.Text}>Please enter the following information</Text>
      <View />
      <View style={styles.inputWrapper}>

        <View>
          <RegistrationInput
            placeholder="First Name"
            top={180}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View>
          <RegistrationInput
            placeholder="Last Name"
            top={250}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View>
          <RegistrationInput
            placeholder="Birthday(MM/DD/YYYY)"
            top={320}
            onChangeText={(text) => setBirthday(text)}
          />
        </View>
        <View>
          <RegistrationInput
            placeholder="Your Anniversary"
            top={380}
            onChangeText={(text) => setAnniversary(text)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleNext}>
        <Button title="Next" buttonStyle={{ top: 540, left: 45 }} />
      </TouchableOpacity>
      <Text style={styles.Subtitle}>The information can be seen on your partner’s MeU, and all the information you entered will be used only for service optimization</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  Icon: {
    position: 'absolute',
    top: 50,
    left: 25,
    height: 24,
    zIndex: 2,
  },
  progress: {
    width: 70,
    height: 10,
    top: 100,
    alignSelf: 'center',
  },
  Text: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 160,
  },
  Subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    width: 225,
    textAlign: 'center',
    top: 610,
  },
});

export default ProfileInfo;
