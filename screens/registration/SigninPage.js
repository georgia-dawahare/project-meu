import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SigninPage = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/signup-vector.png')}
        style={styles.SignupVector}
      />
      <Text style={styles.WelcomeMeU}>Welcome to{"\n"}MeU</Text>
      <Button title="Sign Up"/>
      <Registration_Input 
      placeholder="Enter your email"
      top={340}/>
      <Registration_Input 
      placeholder="Enter your Password"
      top={413}/>
      <Text style={styles.ForgotPassword}>Forgot Password?</Text>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  WelcomeMeU:{
    position:'absolute',
    top:60,
    left:27,
    color: '#ffffff',
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 32,
    weight:400,
    letterSpacing:1,
    lineSpacing:34,
    alignSelf:'center',
  },
  SignupVector: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  ForgotPassword: {
    position:'absolute',
    top:597,
    left:136,
    color: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    weight:400,
    letterSpacing:1,
    alignSelf:'center',
  },
});


export default SigninPage;