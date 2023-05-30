import React, { useEffect, useState } from 'react';
import {
  Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/datastore';
import SignUpGraphic from '../../components/SignUpGraphic';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('HomePage');
      }
    });
    return unSubscribe;
  }, []);

  const handleSignIn = () => {
    // Clear previous email error
    setEmailError('');
    setPasswordError('');

    // Validate email format
    if (!isValidEmail(email)) {
      setEmailError('The email address is invalid');
      return; // if email is invalid
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        const { email } = user;

        const userRef = firebase.database().ref(`users/${user.uid}`);
        userRef.once('value', (snapshot) => {
          const userData = snapshot.val();
          const savedPassword = userData.password; // Access the stored password
          console.log(savedPassword);

          // Compare the entered password with the stored password
          if (password === savedPassword) {
            console.log(`Logged in as ${email}`);
            // Proceed with the login process
          } else {
            setPasswordError('The Password is incorrect');
            console.log('The Password is incorrect');
          }
        });

        console.log('Signed in with:', user.email);
      })
      .catch((error) => {
        setPasswordError('The Password is incorrect');
        // alert(error);
      });
  };

  const isValidEmail = (email) => {
    // Use a regular expression to check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <SignUpGraphic />
        <View style={styles.Container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              textAlign="center"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            {/* Render the error message if emailError is not empty */}
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgetPass}>
              <Text style={styles.buttonOutLineText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52.5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  button: {
    backgroundColor: '#E62B85',
    width: 300,
    height: 56,
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },

  input: {
    width: 342,
    height: 56,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginHorizontal: 24,
    marginTop: 17,
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },

  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutLineText: {
    color: '#E62B85',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutLine: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 45,
  },

  errorText: {
    color: '#E62B85',
  },
  forgetPass: {
    marginTop: 24,
    fontWeight: 400,
  },

});

export default LoginScreen;
