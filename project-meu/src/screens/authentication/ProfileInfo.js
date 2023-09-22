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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackIcon}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View>
          <Text style={styles.instructionTxt}>
            Successfully connected!
            {'\n'}
            Please fill out your profile
          </Text>
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(text) => setFirstName(text)} />
          <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(text) => setLastName(text)} />
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
          <Text style={styles.dateTxt}>
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
    marginLeft: 24,
    marginRight: 24,
  },
  backWrapper: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  gobackIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'left',
    fontFamily: 'SF-Pro-Display-Regular',
    borderColor: '#E2E2E2',
    width: 342,
    height: 56,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 18,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 15,
  },
  dateTxt: {
    justifyContent: 'center',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 14,
  },

  dataWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 342,
  },
  instructionTxt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontColor: '#212121',
    fontSize: 20,
    lineHeight: 27,
    marginTop: 60,
  },
  subtitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: '#969696',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    width: 225,
  },
  dateTimePicker: {
    // backgroundColor: '#458923',
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
    height: 60,
    width: 342,
    borderRadius: 15,
    margin: 20,
  },
});

export default ProfileInfo;
