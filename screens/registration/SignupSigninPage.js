import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SignupSigninPage = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/signup-vector.png')}
        style={styles.SignupVector}
      />
      <Text style={styles.WelcomeMeU}>Welcome to{"\n"}MeU</Text>
      <Button title="Sign Up" buttonStyle={{ top: 400, left:45}}/>
      <Text style={styles.SignInContainer}>
        <Text style={styles.Already}>Already have an ID?</Text>
        <Text style={styles.SignInText}>    Sign In</Text>
    </Text>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    SignupVector: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
      },
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
  SignInContainer: {
    position:'absolute',
    top:480,
    fontSize: 16,
    weight:400,
    letterSpacing:1,
    alignSelf:'center',
  },
  Already:{
    fontFamily: 'SFProDisplay-Regular',
    left:88,
    color:'rgba(0,0,0,1)'
  },
  SignInText:{
    fontFamily: 'SFProDisplay-Semibold',
    left:249,
    color:'rgba(230, 43, 133, 1)'
  },
});


export default SignupSigninPage;