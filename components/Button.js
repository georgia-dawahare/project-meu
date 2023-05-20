import React from 'react';
import reactDom from 'react-dom';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { FlipInEasyX } from 'react-native-reanimated';

const Button = ({ onPress, title, buttonStyle}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Medium',
    
    position: 'absolute',
    alignItems:"center",
    justifyContent:"center",
    alignSelf:'center',

    height:56,
    width:300,
    // top:517,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Button;
