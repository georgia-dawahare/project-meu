import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image, View, TextInput} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();
    

const SignupPage2 = (props) => {
    const [code, setCode] = useState('');
  
    const handleCodeChange = (value) => {
      setCode(value);
    };

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Icons/goback-black.png')}
        style={styles.goback}
      />
      <Image
        source={require('../../assets/Images/progress-1.png')}
        style={styles.progress}
      />

      <Text style={styles.Title}>Confirmation Code</Text>
      <Text style={styles.Subtitle}>Enter 4 digits code that we have sent through your email.</Text>

      <View style={styles.squareContainer}>
        <View style={[styles.square, code.length >= 1]} />
        <View style={[styles.square, code.length >= 2]} />
        <View style={[styles.square, code.length >= 3]} />
        <View style={[styles.square, code.length >= 4]} />
      </View>
      
      <View style={styles.timercontainer}>
        <Image
            source={require('../../assets/Icons/clock.png')}
            style={styles.timer}
        />
        <Text style={styles.timertext} >07:36</Text>
      </View>
      

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        value={code}
        onChangeText={handleCodeChange}
      />


      <Button title="Resend the Code" buttonStyle={{ top: 572, left:45}}/>
      <Button title="Continue" buttonStyle={{ top: 640, left:45}}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  goback:{
    position:'absolute',
    top:32,
    left:24,
    height:24,
    zIndex:2,
  },
  progress:{
      width:70,
      height:10,
      top:160,
      alignSelf:'center',
  },
  Title:{
    fontFamily:'SFProDisplay-Medium',
    fontSize:18,
    lineHeight:27,
    color:'rgba(0,0,0,1)',
    alignSelf:'center',
    width:300,
    textAlign:'center',
    top:230,
  },
  Subtitle:{
    fontFamily:'SFProDisplay-Medium',
    fontSize:14,
    lineHeight:21,
    color:'rgba(106,108,115,1)',
    alignSelf:'center',
    width:300,
    textAlign:'center',
    top:250,
  },
  squareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 290,
  },
  square: {
    width: 68,
    height: 80,
    borderWidth: 1,
    borderRadius:15,
    borderColor: 'rgba(224,224,224,1)',
    marginHorizontal: 4,
  },
  timercontainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    top:308,
    alignItems:'center',
  },
  timer:{
    alignSelf:'center',
  },
  timertext:{
    fontFamily:'SFProDisplay-Medium',
    fontSize:16,
    color:'rgba(230,43,133,1)',
    marginLeft:12,
  },
  input: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
});


export default SignupPage2;