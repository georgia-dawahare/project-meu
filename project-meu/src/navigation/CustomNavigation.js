import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/home/HomePage';
import HomeCalendar from '../screens/home/HomeCalendar';
import PenguinsPage from '../screens/penguins/PenguinsPage';
import CheckinPage from '../screens/checkin/CheckinPage';
import CheckinHistory from '../screens/checkin/CheckinHistory';
import CheckinSubmit from '../screens/checkin/CheckinSubmit';
import BackgroundChange from '../screens/home/BackgroundChange';
import SignIn from '../screens/home/SignIn';
import SettingPage from '../screens/settings/SettingPage';
import VersionPage from '../screens/settings/VersionPage';
import SignUpSignIn from '../screens/home/SignUpSignIn';
import SettingPersonalInfo from '../screens/settings/SettingPersonalInfoPage';
import SettingNotificationPage from '../screens/settings/SettingNotificationPage';
import Homeplaceholder from '../screens/home/homeplaceholder';

const Stack = createNativeStackNavigator();

function HomeScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
      <Stack.Screen
        name="HomeCalendar"
        component={HomeCalendar}
      />
      <Stack.Screen
        name="BackgroundChange"
        component={BackgroundChange}
      />
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
      />
      <Stack.Screen
        name="VersionPage"
        component={VersionPage}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUpSignIn"
        component={SignUpSignIn}
      />
      <Stack.Screen
        name="SettingNotificationPage"
        component={SettingPersonalInfo}
      />
      <Stack.Screen
        name="SettingPersonalInfo"
        component={SettingNotificationPage}
      />
      <Stack.Screen
        name="Homeplaceholder"
        component={Homeplaceholder}
      />
    </Stack.Navigator>
  );
}

export { HomeScreenNavigator };

function CheckinScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Checkin"
        component={CheckinPage}
      />
      <Stack.Screen
        name="CheckinSubmit"
        component={CheckinSubmit}
      />
      <Stack.Screen
        name="CheckinHistory"
        component={CheckinHistory}
      />
    </Stack.Navigator>
  );
}

export { CheckinScreenNavigator };

function PenguinsScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Penguins"
        component={PenguinsPage}
      />
    </Stack.Navigator>
  );
}

export { PenguinsScreenNavigator };

function SettingScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
      />
      <Stack.Screen
        name="SettingPersonalInfo"
        component={SettingPersonalInfo}
      />
      <Stack.Screen
        name="VersionPage"
        component={VersionPage}
      />
      <Stack.Screen
        name="SettingNotificationPage"
        component={SettingNotificationPage}
      />

    </Stack.Navigator>
  );
}
export { SettingScreenNavigator };

// Modified code by: https://jaymanyoo.medium.com/combine-bottom-tab-navigator-with-stack-navigator-in-react-native-2020-58804b4afded
