import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'
import SignupGraphic from '../../components/SignupGraphic'

LogBox.ignoreAllLogs();

const SigninForgotPasswordPage1 = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/x-white.png')}
        style={styles.Icon}
      />
      <SignupGraphic/>

      <Text style={styles.Title}>Forgot Password?</Text>
      <Text style={styles.Subtitle}>We need to confirm your email to send you instructions to reset the password.</Text>
      <Registration_Input 
      placeholder="Enter your email"
      top={372}/>
      <Button title="Reset Password" buttonStyle={{ top: 485, left:45}}/>
      <Text style={styles.GoBack}>Go back to Sign In</Text>
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
  Title:{
      fontFamily:'SFProDisplay-Semibold',
      fontSize:18,
      color:'rgba(0,0,0,1)',
      alignSelf:'center',
      top:267

  },
  Subtitle:{
    fontFamily:'SFProDisplay-Medium',
    fontSize:14,
    lineHeight:20,
    color:'rgba(106,108,115,1)',
    alignSelf:'center',
    width:300,
    textAlign:'center',
    top:285,
  },
  GoBack: {
    position:'absolute',
    top:565,
    // left:136,
    color: 'rgba(0,0,0, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 16,
    letterSpacing:1,
    alignSelf:'center',
  },
});


export default SigninForgotPasswordPage1;