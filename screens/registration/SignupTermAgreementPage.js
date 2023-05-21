import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'
import SignupGraphic from '../../components/SignupGraphic'

LogBox.ignoreAllLogs();

const SignupTermAgreementPage = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/x-white.png')}
        style={styles.Icon}
      />
      <SignupGraphic/>
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
});


export default SignupTermAgreementPage;