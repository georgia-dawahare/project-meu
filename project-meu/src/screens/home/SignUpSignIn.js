  import React, { useEffect, useState } from 'react';
  import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
  import { auth } from '../../services/datastore';
  import { useNavigation } from '@react-navigation/native';
  import SignUpGraphic from '../../components/SignUpGraphic';
  
  const LoginScreen = () => {
    const navigation = useNavigation();
  
    const handleSignIn = () => {
        navigation.replace('SignIn')
    };

    const handleForgotPassword =()=>{
        navigation.replace('SignInForgotPassword1')
    }
  
    const handleScreenPress = () => {
      Keyboard.dismiss();
    };
  
    return (
      <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
      <SignUpGraphic />
      <View style={styles.Container}>   
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.forgetPass}>
          <Text style={styles.buttonOutLineText}>Already have an ID?<Text style={styles.signInText} onPress={handleSignIn}>  Sign In</Text></Text>
        </TouchableOpacity>
      </View>
      </View>
      <View/>
      </View>
      </TouchableWithoutFeedback >
    );
  };
  
  const styles = StyleSheet.create({
    Container:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:52.5
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
      borderRadius: 10,
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
      marginTop: 24,
      fontWeight:400,
    },

    signInText:{
        color: '#E62B85',
        fontWeight:400,

    }
   
  });
  
  export default LoginScreen;
  
  