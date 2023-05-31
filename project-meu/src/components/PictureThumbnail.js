import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

function PictureThumbnail() {
  const [img, setImg] = useState();

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    } else {
      Alert('You did not select any image.');
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
        <Image selectedImage={img} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  thumbnailText: {
    color: 'white',
  },
});

export default PictureThumbnail;
