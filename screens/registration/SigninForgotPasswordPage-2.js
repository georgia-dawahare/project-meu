import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import SignupGraphic from '../../components/SignupGraphic'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SigninForgotPasswordPage2 = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/x-white.png')}
        style={styles.Icon}
      />
      <SignupGraphic/>

      <Text style={styles.Text}>Thank you! - if you have a MeU accout, we've sent you an email!</Text>

      <Button title="Done" buttonStyle={{ top: 465, left:45}}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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