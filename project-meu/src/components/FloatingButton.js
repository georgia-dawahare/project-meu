import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-elements';

function FloatingButton() {
  return (
    <FAB
    icon={<Ionicons name="ios-add" size={24} color="white" />}
    buttonStyle={styles.FAB}
    size="large"
    placement='right'
  />  
  );
}

const styles = StyleSheet.create({
    FAB:{
        backgroundColor:'rgba(230, 43, 133, 1)',
        // position: '', // Add position property
        // top: -20, // Adjust the top value to move the FAB upwards
    },
});

export default FloatingButton;
