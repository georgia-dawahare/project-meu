import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomePage from './src/screens/home/HomePage';
// import CheckinPage from './src/screens/checkin/CheckinPage';
// import PenguinsPage from './src/screens/penguins/PenguinsPage';
import {
  HomeScreenNavigator,
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
} from './src/components/CustomNavigation';

// Stack Navigator
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Checkin" component={CheckinPage} />
        <Stack.Screen name="CheckinSubmit" component={CheckinSubmit} />
        <Stack.Screen name="CheckinHistory" component={CheckinHistory} />
        <Stack.Screen name="Penguins" component={PenguinsPage} />
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          labelStyle: { fontSize: 18 },
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen
          name="CheckinTab"
          component={CheckinScreenNavigator}
        />
        <Tab.Screen
          name="HomeTab"
          component={HomeScreenNavigator}
        />
        <Tab.Screen
          name="PenguinsTab"
          component={PenguinsScreenNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
