import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/home/HomePage';
import CheckinPage from './src/screens/checkin/CheckinPage';
import CheckinSubmit from './src/screens/checkin/CheckinSubmit';
import CheckinHistory from './src/screens/checkin/CheckinHistory';
import PenguinsPage from './src/screens/penguins/PenguinsPage';

// Stack Navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Checkin" component={CheckinPage} />
        <Stack.Screen name="CheckinSubmit" component={CheckinSubmit} />
        <Stack.Screen name="CheckinHistory" component={CheckinHistory} />
        <Stack.Screen name="Penguins" component={PenguinsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
