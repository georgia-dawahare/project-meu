// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import SwipeablePanel from 'rn-swipeable-panel';

// export default class anniversaryCalendar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       swipeablePanelActive: false,
//     };
//   }

//   componentDidMount() {
//     this.openPanel();
//   }

//   openPanel = () => {
//     this.setState({ swipeablePanelActive: true });
//   };

//   closePanel = () => {
//     this.setState({ swipeablePanelActive: false });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <SwipeablePanel
//           fullWidth
//           isActive={this.state.swipeablePanelActive}
//           onClose={this.closePanel}
//           onPressCloseButton={this.closePanel}
//         >
//           <View style={styles.panelContainer}>
//             <Text style={styles.panelText}>Swipeable Panel Content</Text>
//             {/* Your Content Here */}
//           </View>
//         </SwipeablePanel>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   panelContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     padding: 20,
//   },
//   panelText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });
