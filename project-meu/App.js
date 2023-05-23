import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//   HomeScreenNavigator,
//   CheckinScreenNavigator,
//   PenguinsScreenNavigator,
// } from './src/components/CustomNavigation';
import {
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
} from './src/components/CustomNavigation';

import HomeCalendar from './src/screens/home/HomeCalendar';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          labelStyle: { fontSize: 18 },
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen
          name="Check-In"
          component={CheckinScreenNavigator}
        />
        <Tab.Screen
          name="Home"
          // component={HomeScreenNavigator}
          component={HomeCalendar}
        />
        <Tab.Screen
          name="Penguins"
          component={PenguinsScreenNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
