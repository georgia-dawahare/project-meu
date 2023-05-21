import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'
import SignupGraphic from '../../components/SignupGraphic'
// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SigninPage = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/x-white.png')}
        style={styles.Icon}
      />
      <SignupGraphic/>
      <Button title="Sign Up" buttonStyle={{ top: 517, left:45}}/>
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
  Icon:{
    position:'absolute',
    top:32,
    left:342,
    height:24,
    zIndex:2,
  },
  ForgotPassword: {
    position:'absolute',
    // top:597,
    // left:136,
    color: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    weight:400,
    letterSpacing:1,
    alignSelf:'center',
  },
});


export default SigninPage;