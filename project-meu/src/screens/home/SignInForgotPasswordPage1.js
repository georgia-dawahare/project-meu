import React, { useState } from 'react';
import {
  Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUpGraphic from '../../components/SignUpGraphic';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();

  const handleSignIn = () => {
    navigation.replace('SignIn');
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <KeyboardAvoidingView KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <SignUpGraphic />
        <View>
          <Text style={styles.forgetText}>Forgot Password?</Text>
          <Text style={styles.textT}>We need to confirm your email to send you instructions to reset the password</Text>
          <View style={styles.Container}>
            <View style={styles.buttonContainer}>
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
              </View>
              <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgetPass}>
                <Text style={styles.buttonOutLineText} onPress={handleSignIn}>Go back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    marginTop: 80,
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
    // marginTop: 17,
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
    color: '#000000',
    fontWeight: '400',
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
    // marginTop: 24,
    fontWeight: 400,
  },

  signInText: {
    color: '#E62B85',
    fontWeight: 400,

  },

  forgetText: {
    width: 300,
    height: 27,
    fontWeight: 700,
    marginTop: 200,
    textAlign: 'center',
    fontSize: 20,
  },

  textT: {
    width: 300,
    height: 42,
    textAlign: 'center',
    color: 'gray',

  },

});

export default LoginScreen;
