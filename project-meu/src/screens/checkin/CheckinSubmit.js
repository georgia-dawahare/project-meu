import React, {useState} from 'react';
import {View,  Text, 
  SafeAreaView,
  StyleSheet, Image, TouchableOpacity,Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const BackgroundChange = () => {

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isMenuVisible,setMenuVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const toggleMenu = () =>{
    setMenuVisible(!isMenuVisible)
  }

   //using expo's now, let's see how it goes
  const handleMenuOptionClick = async (option) =>{
    console.log(`Clicked option:, ${option}`)

    if (option ==='Remove Widget' ){
      setBackgroundColor('white');
    }
    else{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setBackgroundImage(result.assets[0].uri);

      console.log(result);
    } else {
      console.log('You did not select any image.');
    }
  }
}

  return (
    
    <SafeAreaView style={[styles.container,{backgroundColor}]}>
      {backgroundImage && (
        <Image
          source={{ uri: backgroundImage }}
          style={styles.image}
          resizeMode='cover'
        />
        )}

      {/* <View style ={styles.wordBox}>
        <TouchableOpacity style={styles.containerText}  onPress={()=>{
          pickImageAsync();
          toggleView()}
          }>
            {showView && <View style={styles.hiddenView} />}
          <Text style={styles.buttonText}>
            Select a Background Photo 
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <Text>Open Menu</Text>
      </TouchableOpacity>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.menuContainer}>
        <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionClick('Edit Partners Widget')}
          >
            <Text style={styles.menuOptionText2}>Edit Partner's Widget</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionClick('Gallery')}
          >
            <Text style={styles.menuOptionText}>Choose From Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionClick('Camera')}
          >
            <Text style={styles.menuOptionText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => handleMenuOptionClick('Remove Widget')}
          >
            <Text style={styles.menuOptionText}>Remove Widget Image </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    </SafeAreaView>
  );
}

export default BackgroundChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  // wordBox:{
  //   flex: 1,
  //   marginHorizontal: 48.5, // these are in relation to the page and not the components next (reminder)
  //   marginTop:233,
  //   marginBottom:315, 
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   backgroundColor:'D3d3d3',
  //   borderRadius:20,
  //   elevation: 2, // Adjust the value to control the shadow depth
  //       shadowColor: '#000',
  //       shadowOffset: {
  //         width: 0,
  //         height: 4,
  //       },
  //       shadowOpacity: 0.25,
  //       shadowRadius: 4,
  // },

  image : {
    ...StyleSheet.absoluteFillObject,
   },

  containerText: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',
    color : '#808080'
  },

  //mainly for testing purposes, this must be replaced with an the edit icon i believe
  button: {
    marginTop:700,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  
  menuOption: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderTopWidth: 1,
    borderColor: 'darkgray',
    alignItems:'center',
  },

  closeButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },

  menuOptionText:{
    textAlign:'center',
    color : '#007AFF',
    fontWeight: 500,
    fontSize:18,
  
  },
  menuOptionText2:{
    textAlign:'center',
    color : '#000000',
    fontWeight: 300,
    fontSize:15,
  }
});
