import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Font from 'expo-font';

function SignupShareButton(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { title } = props;

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        // eslint-disable-next-line global-require
        'SF-Pro-Display-Medium': require('../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity style={styles.shareButton}>
      <Text style={styles.shareButtonText}>{title || ('Share')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    width: 72,
    height: 28,
    backgroundColor: 'rgba(230, 43, 133, 1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    left: 278,
  },
  shareButtonText: {
    fontFamily: 'SF-Pro-Display-Medium',
    alignItems: 'center',
    fontSize: 14,
    color: '#ffffff',
  },
});

export default SignupShareButton;
