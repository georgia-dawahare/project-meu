import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
