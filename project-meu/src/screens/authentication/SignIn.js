/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import * as Font from 'expo-font';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import SignUpGraphic from '../../components/SignUpGraphic';
import Button from '../../components/Button';
import { fetchFirestoreUser } from '../../actions/UserActions';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const curUser = useSelector((state) => state.userState.userData);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log('BEFORE', curUser);
        dispatch(fetchFirestoreUser(user.uid));
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes('email') || errorCode.includes('user')) {
          setEmailError('Invalid email');
        } else {
          setEmailError('');
        }
        if (errorCode.includes('password')) {
          setPasswordError('Invalid password');
        } else {
          setPasswordError('');
        }
      });
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          {/* Header */}
          <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.icon}>
            <Image
            // eslint-disable-next-line global-require
              source={require('../../../assets/icons/x-white.png')}
            />
          </TouchableOpacity>
          <SignUpGraphic />

          {/* Sign In */}
          <View style={styles.signInWrapper}>
            <View>
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                textAlign="center"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />

              {/* Render error message if emailError is not empty */}
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                textAlign="center"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />

              {/* Render the error message if passwordError is not empty */}
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            {/* Sign In Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Button title="Sign In" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.buttonOutLineText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 24,
    top: 64,
    zIndex: 2,
  },
  signInWrapper: {
    justifyContent: 'center',
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
  errorText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    lineHeight: 21,
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    marginBottom: 90,
  },
  buttonOutLineText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
});

export default SignIn;
