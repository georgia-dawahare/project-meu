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
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
        'SF-Pro-Display-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),

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
        // console.log('BEFORE', curUser);
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
          setPasswordError('Incorrect password');
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
              source={require('../../../assets/icons/back-arrow.png')}
            />
          </TouchableOpacity>

          {/* Sign In */}
          <View style={styles.signInWrapper}>
            <Text style={styles.SignupTxt}>
              SIGN IN
            </Text>
            <Text style={styles.SignupSubTxt}>
              Log in to your account of MeU!
            </Text>
            <View>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="#A3A3A3"
                textAlign="left"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />

              {/* Render error message if emailError is not empty */}
              {emailError ? <Text style={styles.errorTextEmail}>{emailError}</Text> : null}

              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#A3A3A3"
                textAlign="left"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />

              <TouchableOpacity>
                <Text style={styles.forgotPwText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Render the error message if passwordError is not empty */}
              {passwordError ? <Text style={styles.errorTextPW}>{passwordError}</Text> : null}
            </View>

            {/* Sign In Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Button title="Sign In" />
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
    left: 24,
    top: 80,
  },
  signInWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 240,
    marginRight: 24,
    marginLeft: 24,
  },
  SignupTxt: {
    fontFamily: 'SF-Pro-Display-Bold',
    alignSelf: 'flex-start',
    color: '#E62B85',
    fontSize: 32,
    letterSpacing: 1,
    marginTop: -70,

  },
  SignupSubTxt: {
    fontFamily: 'SF-Pro-Display-Medium',
    alignSelf: 'flex-start',
    marginTop: 18,
    marginBottom: 80,
    color: '#212121',
    fontSize: 16,
    letterSpacing: 1,
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
  errorTextEmail: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 12,
    textAlign: 'flex-start',
    marginLeft: 12,
    marginTop: 4,
  },
  errorTextPW: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 12,
    textAlign: 'flex-start',
    marginLeft: 12,
    marginTop: -32,
  },
  buttonContainer: {
    marginTop: 12,
    alignSelf: 'center',
  },
  button: {
    marginTop: 80,

  },
  forgotPwText: {
    color: '#E62B85',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 14,
    marginTop: 24,
    marginLeft: 'auto', // 'auto'를 사용하여 오른쪽으로 정렬
  },
});

export default SignIn;
