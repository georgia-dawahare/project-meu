import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SignupShareButton = ({ placeholder, top }) => {
  return (
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    width:72,
    height:28,
    backgroundColor:'rgba(230, 43, 133, 1)',
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    top:20,
    left:278,
  },
  shareButtonText: {
    fontFamily:'SFProDisplay-Medium',
    alignItems:'center',
    fontSize: 14,
    color: '#ffffff',
  },
});

export default SignupShareButton;
