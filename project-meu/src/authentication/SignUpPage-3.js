import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View,
} from 'react-native';
import Button from '../components/Button';
import RegistrationInput from '../components/RegistrationInput';
import SignupShareButton from '../components/SignUpShareButton';

function SignupPage3(props) {
//   const [code, setCode] = useState('');

  //   const handleCodeChange = (value) => {
  //     setCode(value);
  //   };

  return (
    <SafeAreaView>
      <Image
        source="../assets/icons/goback-black.png"
        style={styles.goback}
      />
      <Image
        source="../assets/images/progress-2.png"
        style={styles.progress}
      />

      <Text style={styles.Title}>Please enter partner&apos;s invitaion code and connect!</Text>

      <View style={styles.mycodeContainer}>
        <Text style={styles.partnerTitle}>
          My Invitation Code    23:23:23
        </Text>
        <RegistrationInput
          placeholder="3923 3942"
          top={20}
          textAlign="flex-start"
          editable={false}
        />
        <SignupShareButton />
      </View>

      <View style={styles.parnterContainer}>
        <Text style={styles.partnerTitle}>
          Have you received your partner&apos;s code?
        </Text>
        <RegistrationInput
          placeholder="Enter the Code"
          top={20}
          textAlign="flex-start"
        />
      </View>

      <Button title="Connect" buttonStyle={{ top: 559, left: 45 }} />
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
  input: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  mycodeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: 260,
  },
  parnterContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    top: 350,
  },
  partnerTitle: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
    color: 'rgba(51,51,51,1)',
    left: 46,
  },
});

export default SignupPage3;
