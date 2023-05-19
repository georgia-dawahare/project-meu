import React, { useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import Button from '../../components/Button'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SigninPage = (props) => {

  return(
    <SafeAreaView>
      {/* <CustomButton onPress={handleButtonPress} title="Press Me" /> */}
      <Button title="Sign Up"/>
    </SafeAreaView>
  )
  
};


export default SigninPage;