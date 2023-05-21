import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SigninForgotPasswordPage2 = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/x-white.png')}
        style={styles.Icon}
      />
      <Image
        source={require('../../assets/signup-vector.png')}
        style={styles.SignupVector}
      />
      <Text style={styles.WelcomeMeU}>Welcome to{"\n"}MeU</Text>

      <Text style={styles.Text}>Thank you! - if you have a MeU accout, we've sent you an email!</Text>

      <Button title="Done" buttonStyle={{ top: 465, left:45}}/>
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
  Icon:{
    position:'absolute',
    top:32,
    left:342,
    height:24,
    zIndex:2,
  },
  Text:{
    fontFamily:'SFProDisplay-Medium',
    fontSize:18,
    lineHeight:27,
    color:'rgba(106,108,115,1)',
    alignSelf:'center',
    width:300,
    textAlign:'center',
    top:355,
  },
});


export default SigninForgotPasswordPage2;