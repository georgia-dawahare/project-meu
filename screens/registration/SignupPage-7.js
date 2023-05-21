import { CurrentRenderContext } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const SignupPage7 = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Images/Onboarding.png')}
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>Welcome to MeU</Text>
    <Button title="Go to MainPage" buttonStyle={{ top: 640, left:45}}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    BannerImg:{
        position:'absolute',
        width:342,
        height:329,
        alignSelf:'center',
        top:240,
    },
      Title:{
        fontFamily: 'SFProDisplay-Bold',
        fontSize:34,
        color:'rgba(0,0,0,1)',
        alignSelf:'center',
        lineHeight:41,
        top:140,
      },
});


export default SignupPage7;