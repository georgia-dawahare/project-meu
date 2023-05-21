import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, TextInput } from 'react-native';

import * as Font from 'expo-font';

// // import Button from './components/Button';
import Main1Page from './screens/main1/Main1Page-1'
import SignupPage1 from './screens/registration/SignupPage-1'

const loadFonts = async () => {
  await Font.loadAsync({
    'SFProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SFProDisplay-Medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
    'SFProDisplay-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProDisplay-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
  });
};

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

const App = (props) => {

  useEffect(() => {
    loadFonts();
  }, []);

  return(
    <SafeAreaView>
      {/* <Main1Page/> */}
      <SignupPage1/>
      {/* <CustomButton onPress={handleButtonPress} title="Press Me" /> */}
      {/* <Button title="Press Me" /> */}
    </SafeAreaView>
  )
  
};


export default App;
