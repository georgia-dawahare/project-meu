// /* eslint-disable global-require */
// import React from 'react';
// import {
//   SafeAreaView, StyleSheet, Text, Image, View,FlatList, TouchableOpacity,
// } from 'react-native';

// const DATA = [
//     {
//       id: '11',
//       title: 'Persomal Info',
//     },
//     {
//       id: '22',
//       title: 'Privacy and Data',
//     },
//     {
//       id: '33',
//       title: 'Notification Preferences',
//     },
//     {
//         id: '44',
//         title: 'Temperature Unit',
//       },
//       {
//         id: '55',
//         title: 'Version',
//       },
//   ];

//   const Item = ({title}) => (
//     // <View style={styles.item}>
//     // <TouchableOpacity onPress={() => handleItemClick(title)}>
//     // <Text style={styles.title}>{title}</Text>
//     // </TouchableOpacity>
//     // </View>
//     <TouchableOpacity style={styles.item}onPress={() => handleItemClick(title)}>
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   </TouchableOpacity>
//   );
//   function handleItemClick(title) {
//     console.log('Clicked item:', title);
//     // 원하는 동작을 수행합니다.
//   }

// function SettingPage() {

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//         <View>
//             <Image
//             source={require('../../../assets/icons/goback-black.png')}
//             style={styles.Icon}
//             />
//             <Text style={styles.topTitle}>Settings</Text>
//         </View>
//         <View style={styles.contents}>
//         <Text style={styles.name}>Florian</Text>
//         <Text style={styles.email}>flori@gmail.com</Text>
//         <FlatList
//         data={DATA}
//         renderItem={({item}) => <Item title={item.title} onPress={handleItemClick}/>}
//         keyExtractor={item => item.id}
//         />
//         </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   Icon: {
//     position: 'absolute',
//     top: 32,
//     left: 24,
//     height: 24,
//     zIndex: 2,
//   },
//   topTitle:{
//     fontFamily: 'SFProDisplay-Medium',
//     fontSize:20,
//     top:32,
//     left:160,
//   },
//   contents:{
//       flex:1,
//       flexDirection:'column',
//   },
//   name:{
//       fontWeight:600,
//       fontSize:22,
//       left:24,
//       top:93,
//   },
//   email:{
//     fontWeight:400,
//     fontSize:14,
//     left:24,
//     top:96,
//   },
//   Text: {
//     fontFamily: 'SFProDisplay-Medium',
//     fontSize: 18,
//     lineHeight: 27,
//     color: 'rgba(0,0,0,1)',
//     alignSelf: 'center',
//     width: 300,
//     textAlign: 'center',
//     top: 230,
//   },
//   item: {
//   backgroundColor: '#f9c2ff',
//   padding: 16,
//   marginVertical: 10,
//   marginHorizontal: 24,
//   },
//   title: {
//     fontSize: 14,
//   },
// });

// export default SettingPage;

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: '11',
    title: 'Persomal Info',
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

const Item = ({ title, onPress }) => (
  <TouchableOpacity onPress={() => onPress(title)} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

function SettingPage() {
  const handleItemClick = (title) => {
    console.log('Clicked item:', title);
    // 원하는 동작을 수행합니다.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/icons/goback-black.png')}
          style={styles.Icon}
        />
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

    topTitle:{
    fontFamily: 'SFProDisplay-Medium',
    fontSize:20,
    left:100,
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
    marginTop:6,
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    paddingLeft:0,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },
  personalInfo:{
      marginTop:32,
  },
});

export default SettingPage;
