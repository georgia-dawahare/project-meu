import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Button({ onPress, title, buttonStyle }) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
    fontFamily: 'SFProDisplay-Semibold',

    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    height: 56,
    width: 300,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Button;
