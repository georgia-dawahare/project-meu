/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import { getAuth, signOut } from 'firebase/auth';
import { RadioButton } from 'react-native-paper';

const SignOutContent = [
  // {
  //   id: 'SO',
  //   title: 'Sign Out',
  // },
  {
    id: 'UP',
    title: 'Unpair with Partner',
  },
];

function SettingPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');

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

  const signOutUser = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Successfully logged out. See you later!');
    }).catch((error) => {
      console.log('Error signing out: ', error);
    });
  };

  const handleItemClick = (title) => {
    console.log('Clicked item:', title);
    if (title === 'Sign Out') {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to Sign Out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'SignOut',
            onPress: signOutUser,
            style: 'destructive',
          },
        ],
      );
    } else if (title === 'Unpair with Partner') {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to unpair?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'SignOut',
            // onPress: deleteEventConfirmation,
            style: 'destructive',
          },
        ],
      );
    } else if (title === 'Personal Info') {
      navigation.navigate('SettingPersonalInfoPage');
    } else if (title === 'Version') {
      navigation.navigate('VersionPage');
    } else if (title === 'Privacy and Data') {
      navigation.navigate('VersionPage');
    } else if (title === 'Notification Preferences') {
      navigation.navigate('SettingNotificationPage');
    }
  };

  const handleTemperatureUnitChange = (value) => {
    setTemperatureUnit(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Settings</Text>
      </View>
      <View style={styles.contents}>
        <View style={styles.personalInfo}>
          <Text style={styles.name}>Florian</Text>
          <Text style={styles.email}>flori@gmail.com</Text>
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('Personal Info')}
        >
          <Text style={styles.title}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemClick('Notification Preferences')}
        >
          <Text style={styles.title}>Notification Preferences</Text>
        </TouchableOpacity>
        <View style={styles.tempContainer}>
          <Text style={styles.title}>Temperature Unit</Text>
          <View style={styles.radioContainer}>
            <RadioButton.Group
              onValueChange={handleTemperatureUnitChange}
              value={temperatureUnit}
              style={styles.radioButtonContainer}
            >
              <View style={styles.radioButton}>
                <RadioButton value="Celsius" color="rgb(230, 43, 133)" />
                <Text style={[styles.radioButtonLabel, { marginRight: 20 }]}>&apos;C</Text>
                <RadioButton style={styles.radioButtonF} value="Fahrenheit" color="rgb(230, 43, 133)" />
                <Text style={styles.radioButtonLabel}>&apos;F</Text>
              </View>
            </RadioButton.Group>
          </View>

        </View>

        {SignOutContent.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemClick(item.title)}
            style={styles.itemSignout}
          >
            <Text style={[styles.title, styles.signoutTitle]}>{item.title}</Text>
          </TouchableOpacity>
        ))}

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
    left: 100,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  name: {
    fontWeight: '600',
    fontSize: 22,
    marginBottom: 4,
  },
  email: {
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 16,
    marginTop: 6,
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    paddingLeft: 0,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },
  personalInfo: {
    marginTop: 32,
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

export default SettingPage;
