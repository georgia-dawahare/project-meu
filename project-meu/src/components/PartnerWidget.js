import React, { useState } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, View, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

function PartnerWidget() {
  const [img, setImg] = useState('https://www.figma.com/file/PYeh3GKvg4VwmsTEXIc0Bs/image/72d9c95e3b736ee06dd3ba6eacc4b048d82d7218?fuid=1112504140237920766');

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  if (img === null) {
    return (
      <View style={styles.thumbnail}>
        <TouchableOpacity onPress={pickImageAsync}>
          <Text style={styles.thumbnailText}>ADD IMAGE</Text>
          <FontAwesome5 name="edit" size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.thumbnail}>
        <TouchableOpacity>
          <Image source={{ uri: img }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    height: 120,
    width: 120,
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 20,
  },

  thumbnailText: {
    color: 'white',
  },
});

export default PartnerWidget;
