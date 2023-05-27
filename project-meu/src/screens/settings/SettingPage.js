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

const DATA = [
  {
    id: '11',
    title: 'Personal Info',
  },
  {
    id: '22',
    title: 'Privacy and Data',
  },
  {
    id: '33',
    title: 'Notification Preferences',
  },
  {
    id: '44',
    title: 'Temperature Unit',
  },
  {
    id: '55',
    title: 'Version',
  },
];

function Item({ title, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(title)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function SettingPage({ navigation }) {
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

  const handleItemClick = (title) => {
    console.log('Clicked item:', title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../assets/icons/goback-black.png')}
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

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} onPress={handleItemClick} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

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
});

export default SettingPage;
