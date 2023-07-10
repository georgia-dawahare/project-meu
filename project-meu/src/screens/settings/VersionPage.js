/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import Button from '../../components/Button';

const DATA = [
  {
    id: 'CV',
    title: 'Current Versoin',
  },
  {
    id: 'TLV',
    title: 'The Lastest Version',
  },
];

function Item({ title, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(title)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function VersionPage({ navigation }) {
  const handleItemClick = (title) => {
    console.log('Clicked item:', title);
  };
  const [fontLoaded, setFontLoaded] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Version</Text>
      </View>
      <View style={styles.logo}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logoIcon}
        />
      </View>

      <View style={styles.contents}>
        <View style={styles.personalInfo}>
          <Text style={styles.versionInfo}>Version Info</Text>
        </View>

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} onPress={handleItemClick} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <Button title="Update the Latest Version" buttonStyle={{ top: 120, left: 45 }} />

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
  item: {
    paddingLeft: 0,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },
  personalInfo: {
    marginTop: -50,
  },
  logoIcon: {
    width: 306,
    height: 231,
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
  },
  versionInfo: {
    marginBottom: 16,
    fontSize: 16,
    color: '#4F4F4F',
  },
});

export default VersionPage;
