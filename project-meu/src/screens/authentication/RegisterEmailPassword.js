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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../../actions/UserActions';
import { updatePassword } from '../../actions/PasswordActions';

function RegisterEmailPassword({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleRegister = async () => {
    let userId;
    if (email && password) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setError('');
          const { user } = userCredential;
          if (user) {
            userId = user.uid;
            const newUser = {
              uid: userId,
              email,
            };
            dispatch(createUser(newUser));
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
      dispatch(updatePassword(password));
      navigation.navigate('CreatePair');
    }
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
                  source={require('../../../assets/icons/back-arrow.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              <View>
                <Text style={styles.SignupTxt}>
                  SIGN UP
                </Text>
                <Text style={styles.SignupSubTxt}>
                  Nice to meet you! Please register to join MeU!
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="A3A3A3"
                  textAlign="center"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="A3A3A3"
                  textAlign="center"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
                />
                {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleRegister} style={password && email ? styles.activeButton : styles.inactiveButton}>
                  <Text style={styles.buttonTxt}>Next</Text>
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
    marginLeft: 24,
    marginRight: 24,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 300,
    marginTop: 140,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 30,
  },
  SignupTxt: {
    fontFamily: 'SF-Pro-Display-Bold',
    alignSelf: 'flex-start',
    color: '#E62B85',
    fontSize: 32,
    letterSpacing: 1,
    marginTop: -20,

  },
  SignupSubTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    alignSelf: 'flex-start',
    marginTop: 18,
    marginBottom: 80,
    color: '#212121',
    fontSize: 12,
    letterSpacing: 1,
  },
  buttonWrapper: {
    marginTop: 100,
  },
  activeButton: {
    backgroundColor: '#E62B85',
    height: 60,
    width: 342,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // marginTop: 80,
    // marginTop: 100,
  },
  inactiveButton: {
    backgroundColor: '#FFB2D7',
    height: 60,
    width: 342,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // marginTop: 80,
    // marginTop: 100,
  },
  buttonTxt: {
    color: 'white',
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 20,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'left',
    fontFamily: 'SF-Pro-Display-Regular',
    borderColor: '#EEEEEE',
    width: 342,
    height: 56,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 18,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 15,
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
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'left',
    marginTop: 10,
  },
});

export default RegisterEmailPassword;
