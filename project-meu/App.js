/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import {
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
  HomeScreenNavigator,
  OnboardingScreenNavigator,
} from './src/navigation/CustomNavigation';
import { apiUrl } from './src/constants/constants';
import store from './src/store';

function App() {
  // CHANGE TO TRUE FOR DEV PURPOSES ONLY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    async function checkPartner(uid) {
      let pairId;
      if (uid) {
        const userDoc = await axios.get(`${apiUrl}/users/${uid}`);
        pairId = userDoc?.data?.pair_id;
        if (pairId) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        if (user) {
          checkPartner(uid);
        }
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        { isLoggedIn ? (
          <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
              headerShown: false,
              labelStyle: { fontSize: 18 },
              tabBarActiveTintColor: '#E62B85',
              tabBarInactiveTintColor: '#111827',
            }}
          >
            <Tab.Screen
              name="CheckinTab"
              component={CheckinScreenNavigator}
              headerTitle=""
              headerColor="#fff"
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
              name="PenguinsTab"
              component={PenguinsScreenNavigator}
              options={{
                tabBarLabel: 'Penguins',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="heart-outline" type="ionicon" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (<OnboardingScreenNavigator />)}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
