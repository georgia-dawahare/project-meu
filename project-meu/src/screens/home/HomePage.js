/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import SignUpGraphic from '../../components/SignUpGraphic';

function HomePage() {
  return (
    <SafeAreaView>
      <SignUpGraphic />
    </SafeAreaView>
  );
}

// Example StyleSheet
// const styles = StyleSheet.create({
//   signInText: {
//     fontFamily: 'SFProDisplay-Semibold',
//     color: 'rgba(230, 43, 133, 1)',
//   },
// });

export default HomePage;
