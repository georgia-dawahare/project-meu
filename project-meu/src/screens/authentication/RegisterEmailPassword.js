/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Font from 'expo-font';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { updateLocalUser } from '../../actions/UserActions';

function RegisterEmailPassword({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleNext = async () => {
    // I know it's bad to store password, but it's 5 am and I'm hacking it
    const newUser = {
      email,
      password,
    };
    dispatch(updateLocalUser(newUser));
    navigation.navigate('ProfileInfo');
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../../assets/icons/goback-black.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <View>
                <Image
                  source={require('../../../assets/images/progress-1.png')}
                  style={styles.progress}
                />
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>Nice to meet you! Please register to join MeU.</Text>
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="gray"
                  textAlign="center"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="gray"
                  textAlign="center"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleNext}>
                  <Button title="Next" buttonStyle={{ backgroundColor: password && email ? '#E62B85' : '#FFB2D7' }} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 300,
    marginTop: 140,
  },
  icon: {
    top: 50,
    left: 25,
  },
  progress: {
    width: 70,
    height: 10,
    alignSelf: 'center',
  },
  buttonWrapper: {
    marginTop: 50,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontFamily: 'SF-Pro-Display-Regular',
    borderBottomColor: '#4F4F4F',
    width: 300,
    height: 56,
    marginTop: 17,
    fontSize: 16,
    lineHeight: 24,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 300,
  },
  textWrapper: {
    marginTop: 69,
  },
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default RegisterEmailPassword;
