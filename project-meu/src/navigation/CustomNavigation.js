import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCalendar from '../screens/home/HomeCalendar';
import PenguinsPage from '../screens/penguins/PenguinsPage';
import CheckinPage from '../screens/checkin/CheckinPage';
import CheckinHistory from '../screens/checkin/CheckinHistory';
import CheckinSubmit from '../screens/checkin/CheckinSubmit';
import SettingPage from '../screens/settings/SettingPage';
import VersionPage from '../screens/settings/VersionPage';
import SettingPersonalInfo from '../screens/settings/SettingPersonalInfoPage';
import SettingNotificationPage from '../screens/settings/SettingNotificationPage';
import TempHome from '../screens/home/TempHome';

const Stack = createNativeStackNavigator();

function HomeScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TempHome"
        component={TempHome}
      />
      <Stack.Screen
        name="HomeCalendar"
        component={HomeCalendar}
      />
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
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
