/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View,
} from 'react-native';
import Button from '../../components/Button';

function SignupPage4(props) {
//   const [code, setCode] = useState('');

  //   const handleCodeChange = (value) => {
  //     setCode(value);
  //   };

  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/icons/goback-black.png')}
        style={styles.goback}
      />
      <Image
        source={require('../../assets/images/progress-2.png')}
        style={styles.progress}
      />

      <Text style={styles.Title}>We are waiting for your partner&apos;s accept!</Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Remaining time for connecting
        </Text>
        <Text style={styles.timerTime}>
          12:12:12
        </Text>
        <Text style={styles.timerSubtext}>
          Your partner must register and request to connect within the remaining time to use MeU.
        </Text>
      </View>

      <Button title="Next" buttonStyle={{ top: 559, left: 45 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  goback: {
    position: 'absolute',
    top: 32,
    left: 24,
    height: 24,
    zIndex: 2,
  },
  progress: {
    width: 70,
    height: 10,
    top: 160,
    alignSelf: 'center',
  },
  Title: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
  timerContainer: {
    flexDirection: 'c',
    justifyContent: 'center',
    top: 260,
    alignItems: 'center',
  },
  timerText: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    color: 'rgba(230,43,133,1)',
  },
  timerTime: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 32,
    color: 'rgba(230,43,133,1)',
    top: 6,
  },
  timerSubtext: {
    width: 225,
    textAlign: 'center',
    color: 'rgba(130,130,130,1)',
    top: 30,
    lineHeight: 21,
  },

});

export default SignupPage4;
