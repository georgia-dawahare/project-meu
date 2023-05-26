/* eslint-disable global-require */
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View,FlatList,StatusBar,
} from 'react-native';
import Button from '../../components/Button';
import RegistrationInput from '../../components/RegistrationInput';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

function SettingPage() {
  return (
    <SafeAreaView>
        <View>
            <Image
            source={require('../../../assets/icons/goback-black.png')}
            style={styles.Icon}
            />
            <Text style={styles.topTitle}>Settings</Text>
        </View>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Icon: {
    position: 'absolute',
    top: 32,
    left: 24,
    height: 24,
    zIndex: 2,
  },
  topTitle:{
    fontFamily: 'SFProDisplay-Medium',
    fontSize:20,
    top:32,
    left:160,
  },
  progress: {
    width: 70,
    height: 10,
    top: 160,
    alignSelf: 'center',
  },
  Text: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 18,
    lineHeight: 27,
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
    top: 230,
  },
  item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
  top:80,
  },
  title: {
    fontSize: 32,
  },
});

export default SettingPage;