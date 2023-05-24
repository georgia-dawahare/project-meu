/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
  HomeScreenNavigator,
} from './src/navigation/CustomNavigation';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          labelStyle: { fontSize: 18 },
          tabBarActiveTintColor: '#E62B85',
          tabBarInactiveTintColor: '#111827',
        }}
      >
        <Tab.Screen
          name="Check-In"
          component={CheckinScreenNavigator}
          options={{
            tabBarLabel: 'Check-In',
            tabBarIcon: ({ color, size }) => (
              <Icon name="create-outline" type="ionicon" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="HomeTab"
          component={HomeScreenNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" type="ionicon" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Penguins"
          component={PenguinsScreenNavigator}
          options={{
            tabBarLabel: 'Penguins',
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart-outline" type="ionicon" color={color} size={size} />
            ),
          }}

        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;