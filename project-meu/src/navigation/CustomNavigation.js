import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCalendar from '../screens/home/HomeCalendar';
import HomePage from '../screens/home/HomePage';
import PenguinsPage from '../screens/penguins/PenguinsPage';
import CheckinPage from '../screens/checkin/CheckinPage';
import CheckinHistory from '../screens/checkin/CheckinHistory';
import CheckinSubmit from '../screens/checkin/CheckinSubmit';
import BackgroundChange from '../screens/home/BackgroundChange';
import SettingPage from '../screens/settings/SettingPage';
import VersionPage from '../screens/settings/VersionPage';
import SignIn from '../screens/authentication/SignIn';
import SignUpSignIn from '../screens/authentication/SignUpSignIn';
import OnboardingPage from '../screens/authentication/OnboardingPage';
import SettingPersonalInfo from '../screens/settings/SettingPersonalInfoPage';
import SettingNotificationPage from '../screens/settings/SettingNotificationPage';
import TempHome from '../screens/home/TempHome';

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
        name="Onboarding"
        component={OnboardingPage}
      />
      <Stack.Screen
        name="TempHome"
        component={TempHome}
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
        options={{
          headerStyle: {
            backgroundColor: 'pink',
            height: 120,
          },
        }}
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
