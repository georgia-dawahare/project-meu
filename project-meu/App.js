/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import {
//   Text, View, Button, Platform,
// } from 'react-native';
// import Alert from 'react-native';
import axios from 'axios';
import {
  CheckinScreenNavigator,
  PenguinsScreenNavigator,
  HomeScreenNavigator,
  OnboardingScreenNavigator,
} from './src/navigation/CustomNavigation';
import { apiUrl } from './src/constants/constants';
import store from './src/store';
// import expoPushTokensApi from './src/api/expoPushTokens';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       Alert.alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log('Expo push token:', token);
//   } else {
//     Alert.alert('Must use physical device for Push Notifications');
//   }

// if (Platform.OS === 'android') {
//   Notifications.setNotificationChannelAsync('default', {
//     name: 'default',
//     importance: Notifications.AndroidImportance.MAX,
//     vibrationPattern: [0, 250, 250, 250],
//     lightColor: '#FF231F7C',
//   });
// }

//   return token;
// }

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Test title',
//     body: 'Test body 2',
//     data: { testData: 'test data' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

function App() {
  // const setExpoPushToken = useState('');
  const setNotification = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    async function checkPartner(uid) {
      let pairId;
      if (uid) {
        const userDoc = await axios.get(`${apiUrl}/users/firestore/${uid}`);
        pairId = userDoc?.data?.pairId;
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

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification2) => {
      console.log('--- notification received ---');
      console.log(notification2);
      setNotification(notification2);
      console.log('------');
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    // (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('--- notification tapped ---');
      console.log(response);
      console.log('------');
    });

    // Unsubscribe from events
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
            {/* <Tab.Screen
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
            /> */}
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
            {/* <Tab.Screen
              name="PenguinsTab"
              component={PenguinsScreenNavigator}
              options={{
                tabBarLabel: 'Penguins',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="heart-outline" type="ionicon" color={color} size={size} />
                ),
              }}
            /> */}
          </Tab.Navigator>
        ) : (<OnboardingScreenNavigator />)}
      </NavigationContainer>
      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notification Title: {notification && notification.request.content.title} </Text>
          <Text>Notification Body: {notification && notification.request.content.body}</Text>
          <Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View> */}
      {/* Simply remove the comment here to try out push notification on phone */}
      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notification Title: {notification && notification.request.content.title} </Text>
          <Text>Notification Body: {notification && notification.request.content.body}</Text>
          <Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View> */}
    </Provider>
  );
}

export default App;
