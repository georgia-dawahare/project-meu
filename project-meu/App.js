/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
  HomeScreenNavigator,
} from './src/navigation/CustomNavigation';
import OnboardingPage from './src/screens/authentication/OnboardingPage';
import SignUpSignIn from './src/screens/authentication/SignUpSignIn';
import RegisterEmailPassword from './src/screens/authentication/RegisterEmailPassword';
import SignIn from './src/screens/authentication/SignIn';
import store from './src/store';

function App() {
  // CHANGE TO TRUE FOR DEV PURPOSES ONLY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const { uid } = user;
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false); // UNCOMMENT FOR DEV PURPOSES ONLY
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
        ) : (
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false, unmountOnBlur: true }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingPage} />
            <Stack.Screen name="SignUpSignIn" component={SignUpSignIn} />
            <Stack.Screen name="RegisterEmailPassword" component={RegisterEmailPassword} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
