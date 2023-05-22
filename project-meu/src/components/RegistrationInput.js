import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function RegistrationInput({
  placeholder, top, textAlign, editable = true,
}) {
  return (
    <View style={[styles.container, { top }]}>
      <View style={[styles.inputContainer, { alignItems: textAlign }]}>
        <TextInput style={styles.input} placeholder={placeholder} editable={editable} />
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    fontFamily: 'SFProDisplay-Regular',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    width: 300,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
  },
  line: {
    width: 300,
    height: 1,
    backgroundColor: '#4f4f4f',
    alignSelf: 'center',
  },
});

export default RegistrationInput;
