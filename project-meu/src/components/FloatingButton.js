import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-elements';

function FloatingButton() {
  const handlePress = () => {
    console.log('FAB clicked.');
  };
  return (
    <FAB
      icon={<Ionicons name="ios-add" size={24} color="white" />}
      buttonStyle={styles.FAB}
      size="large"
      placement="right"
      onPress={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  FAB: {
    backgroundColor: 'rgba(230, 43, 133, 1)',
  },
});

export default FloatingButton;
