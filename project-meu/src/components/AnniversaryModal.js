import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AnniversaryModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This is a modal</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            Icon=
            <Ionicons name="ios-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 100,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    zIndex: 100,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    zIndex: 100,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 100,
  },
});

export default AnniversaryModal;
