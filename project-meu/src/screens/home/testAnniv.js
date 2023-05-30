// // import React, { useEffect } from 'react';
// import React from 'react';
// import { SafeAreaView, Text } from 'react-native';
// import { FileSystem } from 'expo-file-system';
// // import * as FileSystem from 'expo-file-system';
// // import { Asset } from 'expo-asset';

// const TestAnniv = async () => {
//   try {
//     const anniversariesPath = '../../../assets/data/anniversaries.json';
//     const fileUri = FileSystem.documentDirectory + anniversariesPath;
//     const fileContent = await FileSystem.readAsStringAsync(fileUri);
//     const parsedContent = JSON.parse(fileContent);
//     console.log(parsedContent);
//   } catch (error) {
//     console.error(error);
//   }

//   return (
//     <SafeAreaView>
//       <Text>Check the console for anniversaries</Text>
//     </SafeAreaView>
//   );
// };

// export default TestAnniv;
