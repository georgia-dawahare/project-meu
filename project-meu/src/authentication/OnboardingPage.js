import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import Button from '../components/Button';

function OnboardingPage(props) {
  return (
  <View>
      <Image
        souce="../assets/images/Onboarding.png"
        style={styles.BannerImg}
      />
      <Text style={styles.Title}>
        Whenever You Are,
        {'\n'}
        MeU Connects You
      </Text>
      <Text style={styles.Subtitle}>
        MeU connects long-distance couples with
        {'\n'}
        various interactions.
      </Text>
      <Button title="Let's MeU" buttonStyle={{ top: 673, left: 45 }} />
      <Image
        souce="../assets/images/progress-1.png"
        style={styles.Progress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  BannerImg: {
    position: 'absolute',
    width: 342,
    height: 329,
    alignSelf: 'center',
    top: 80,
  },
  Title: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 22,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    lineHeight: 30,
    top: 454,
  },
  Subtitle: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 16,
    color: 'rgba(106, 109, 115, 1)',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 24,
    top: 476,
  },
  Progress: {
    position: 'absolute',
    top: 616,
    alignSelf: 'center',
  },
});

export default OnboardingPage;
