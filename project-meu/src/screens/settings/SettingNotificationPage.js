/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import ToggleSwitch from 'toggle-switch-react-native';
import { apiUrl } from '../../constants/constants';

function SettingNotificationPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isEnabledPushAlert, setIsEnabledPushAlert] = useState(false);
  const [isEnabledShowPreview, setIsEnabledShowPreview] = useState(false);
  const [isEnabledInappSound, setIsEnabledShowInappSound] = useState(false);
  const [isEnabledShowInappVibration, setIsEnabledInappVibration] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleTogglePushAlert = (value) => {
    setIsEnabledPushAlert(value);
  };

  const handleToggleShowPreview = (value) => {
    setIsEnabledShowPreview(value);
  };

  const handleToggleInappSound = (value) => {
    setIsEnabledShowInappSound(value);
  };

  const handleToggleInappVibration = (value) => {
    setIsEnabledInappVibration(value);
  };

  const handleItemClick = (title) => {
    console.log('Clicked item:', title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TempHome')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Notification Preferences</Text>
      </View>
      <View style={styles.contents}>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('Push Alert')}
        >
          <Text style={styles.title}>Push Alert</Text>
          <View>
            <ToggleSwitch
              isOn={isEnabledPushAlert}
              onColor="rgb(230, 43, 133)"
              offColor="#ccc"
              size="medium"
              onToggle={handleTogglePushAlert}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('Show Preview')}
        >
          <Text style={styles.title}>Show Preview</Text>
          <View>
            <ToggleSwitch
              isOn={isEnabledShowPreview}
              onColor="rgb(230, 43, 133)"
              offColor="#ccc"
              size="medium"
              onToggle={handleToggleShowPreview}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('In-App Sound')}
        >
          <Text style={styles.title}>In-App Sound</Text>
          <View>
            <ToggleSwitch
              isOn={isEnabledInappSound}
              onColor="rgb(230, 43, 133)"
              offColor="#ccc"
              size="medium"
              onToggle={handleToggleInappSound}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('In-App Vibration')}
        >
          <Text style={styles.title}>In-App Vibration</Text>
          <View>
            <ToggleSwitch
              isOn={isEnabledShowInappVibration}
              onColor="rgb(230, 43, 133)"
              offColor="#ccc"
              size="medium"
              onToggle={handleToggleInappVibration}
            />
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  Icon: {
    height: 24,
    marginRight: 8,
  },

  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    left: 40,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 0,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },

  signoutTitle: {
    color: 'rgb(230, 43, 133)',
    fontWeight: 500,
    marginBottom: 30,
    fontSize: 15,
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    right: -95,
  },
  radioButtonLabel: {
    fontSize: 15,
    paddingLeft: 8,
    alignSelf: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    paddingLeft: 0,
    marginVertical: 8,
  },
  itemSignout: {
    marginTop: 32,
  },
});

export default SettingNotificationPage;
