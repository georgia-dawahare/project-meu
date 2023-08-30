/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, TextInput,
} from 'react-native';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateUser } from '../../actions/UserActions';
import { updatePair } from '../../actions/PairActions';

function ProfileInfo({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // TODO: IMPLEMENT DATE CHECKING LOGIC
  const [birthday, setBirthday] = useState(new Date());
  const [anniversary, setAnniversary] = useState(new Date());
  const user = useSelector((state) => state.userState.userData);
  const pair = useSelector((state) => state.pairState.pairData);
  const currUserId = user._id;
  const pairId = pair._id;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // TODO: add error catching before navigation?
  const updateProfile = async () => {
    try {
      const newUserInfo = {
        firstName,
        lastName,
        birthday,
      };

      // TODO: Confirm anniversary w/ partner
      const newPairInfo = {
        relationshipStart: anniversary,
      };
      dispatch(updateUser(currUserId, newUserInfo));
      dispatch(updatePair(pairId, newPairInfo));
    } catch (e) {
      console.log('Failed to update');
    }
  };
  const handleNext = async () => {
    updateProfile();
    navigation.navigate('PenguinCustomization');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || anniversary;
    setAnniversary(currentDate);
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <Image
          source={require('../../../assets/images/progress-2.png')}
          style={styles.progress}
        />

        <View>
          <Text style={styles.instructionTxt}>
            Successfully connected!
            {'\n'}
            Please fill out your profile
          </Text>
        </View>

        <View>
          <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(text) => setFirstName(text)} />
          <View style={styles.line} />
        </View>

        <View>
          <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(text) => setLastName(text)} />
          <View style={styles.line} />
        </View>
        <View style={styles.dataWrapper}>
          <Text style={styles.dateTxt}>
            Birthday:
          </Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            value={birthday}
            mode="date"
            display="default"
            onChangeText={(text) => setBirthday(text)}
          />
        </View>

        <View style={styles.dataWrapper}>
          <Text>
            Your Anniversary:
          </Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            value={anniversary}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonTxt}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>The information can be seen on your partner&apos;s MeU, and all the information you entered will be used only for service optimization</Text>
        </View>
      </View>
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  backWrapper: {
    margin: 25,
  },

  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
    alignSelf: 'center',
  },
  textInput: {
    fontFamily: 'SF-Pro-Display-Regular',
    textAlign: 'center',
    margin: 10,
  },
  dateTxt: {
    justifyContent: 'center',
  },

  dataWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },

  instructionTxt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 18,
    lineHeight: 27,
  },
  subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'rgba(106,108,115,1)',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    width: 225,
  },
  dateTimePicker: {
  },
  buttonTxt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 56,
    width: 300,
    borderRadius: 15,
    margin: 20,
  },
});

export default ProfileInfo;
