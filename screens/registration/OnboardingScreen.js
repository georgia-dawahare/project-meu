import { CurrentRenderContext } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Button from '../../components/Button'
import Registration_Input from '../../components/Registration_Input'

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const OnboardingScreen = (props) => {

  return(
    <SafeAreaView>
      <Image
        source={require('../../assets/Images/Onboarding.png')}
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>Whenever You Are,{"\n"}MeU Connects You</Text>
      <Text style={styles.Subtitle}>MeU connects long-distance couples with{"\n"}various interactions.</Text>
    <Button title="Let's MeU" buttonStyle={{ top: 673, left:45}}/>
    <Image
        source={require('../../assets/Images/progress-1.png')}
        style={styles.Progress}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    BannerImg:{
        position:'absolute',
        width:342,
        height:329,
        alignSelf:'center',
        top:80,
    },
      Title:{
        fontFamily: 'SFProDisplay-Semibold',
        fontSize:22,
        color:'rgba(0,0,0,1)',
        alignSelf:'center',
        lineHeight:30,
        top:454,
      },
      Subtitle:{
        fontFamily: 'SFProDisplay-Medium',
        fontSize:16,
        color:'rgba(106, 109, 115, 1)',
        alignSelf:'center',
        textAlign: 'center',
        lineHeight:24,
        top:476,
      },
      Progress:{
          position:'absolute',
          top:616,
          alignSelf:'center',
      }
});


export default OnboardingScreen;