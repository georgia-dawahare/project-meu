import React from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button'
import Navigationbar from '../../components/Navigationbar'

LogBox.ignoreAllLogs();

const Main1Page = (props) => {

  return(
    <SafeAreaView>
        <Navigationbar/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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


export default Main1Page;