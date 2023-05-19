import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Registration_Input = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={ placeholder } />
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    fontFamily: 'SFProDisplay-Regular',
  },
  inputContainer: {
    width: 342,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
    color: '#828282',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
    alignSelf: 'flex-end',
  },
});

export default Registration_Input;
