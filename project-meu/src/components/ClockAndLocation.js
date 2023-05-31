/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
// using the package expo-location to prompt the user to allow location access
import * as Location from 'expo-location';
import * as Font from 'expo-font';

function ClockAndLocation() {
  // api stuff
  // used the following video tutorial for the following code, with a few modifications for our specific usage\
  // https://youtu.be/NiNLPZsRruY -- tutorial found on medium.com
  const openWeatherKey = '7e003b98d369635004c7ffdcee85e4db';
  const starterUrl = 'https://api.openweathermap.org/data/2.5/weather?';

  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // user and partner data below:
  const [userCity, setUserCity] = useState('');
  const [userTemp, setUserTemp] = useState();

  // find from city
  const [partnerTemp, setPartnerTemp] = useState();

  // Dummy variables
  // replace this stuff with the firebase stuff -- city should be a stored parameter
  const partnerCity = 'New York City';
  const name1 = 'Florian';
  const name2 = 'Catherine';
  // find this in redux
  const units = 'imperial';

  const loadForecast = async () => {
    setRefreshing(true);
    console.log('Refreshing: ', refreshing);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Location Denied.');
    }

    // using expo-location to grab user location
    const location = await Location.getCurrentPositionAsync({});

    // refresher for .then and catching errors: https://www.geeksforgeeks.org/find-what-caused-possible-unhandled-promise-rejection-in-react-native/#
    // make an api call to get the weather
    fetch(`${starterUrl}units=${units}&lat=${location.coords.latitude.toFixed(2)}&lon=${location.coords.longitude.toFixed(2)}&appid=${openWeatherKey}`)
      .then((response) => response.json()).then((data) => {
      // setForecast(data)
        console.log(data);

        setUserCity(data.name);
        setUserTemp(data.main.temp.toFixed(0));
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });

    // now, moving onto the partner's data -- make an API call based on the city name
    fetch(`${starterUrl}units=${units}&q=${partnerCity}&appid=${openWeatherKey}`)
      .then((response) => response.json()).then((data) => {
        console.log(data);
        setPartnerTemp(data.main.temp.toFixed(0));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadForecast();
  }, []);

  // used documentation from react-native-analog-clock to set up timer
  // should replace partner's time with timezone of partner
  // basically updates seconds minutes and hours using the nowDate
  // could not get the package with the analog clock to work, so using live clock as it is
  // found here: https://github.com/gaetanozappi/react-native-clock-analog
  const nowDate = () => {
    const d = new Date();
    const second = d.getSeconds();
    const minute = d.getMinutes();
    const hour = d.getHours();
    return { second, minute, hour };
  };

  const useTimer = () => {
    const [time, setTime] = useState(nowDate());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(nowDate());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return time;
  };

  const { minute, hour } = useTimer();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.calendar}>
      <View style={styles.subSection}>
        <View style={styles.clock}>
          <Text style={styles.clocktext}>{hour}</Text>
          <Text style={styles.clocktext}>
            :
            {minute}
          </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.name}>{name1}</Text>
          <Text style={styles.city}>{userCity}</Text>
          <Text>
            {userTemp}
            {'\u00b0'}
            F
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.subSection}>
        <View style={styles.list}>
          <Text style={[styles.name, { textAlign: 'right' }]}>{name2}</Text>
          <Text style={[styles.city, { textAlign: 'right' }]}>{partnerCity}</Text>
          <Text style={{ textAlign: 'right' }}>
            {partnerTemp}
            {'\u00b0'}
            F
          </Text>
        </View>
        <View style={styles.clock}>
          <Text style={styles.clocktext}>{hour}</Text>
          <Text style={styles.clocktext}>
            :
            {minute}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  clock: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F96EB0',
    height: 100,
    width: 70,
    borderRadius: 15,
  },

  clocktext: {
    fontSize: 35,
    color: 'white',
    margin: 0,
    paddingBottom: 0,
  },

  // documentation to set and center divider
  // https://www.w3schools.com/howto/howto_css_vertical_line.asp
  divider: {
    borderLeftWidth: 1,
    height: 80,
    marginLeft: -0.5,
    top: 20,
    borderColor: '#676767',
  },

  calendar: {
    width: '92%',
    height: 110,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'fixed',
    top: 0,
    left: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  subSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 12,
    paddingBottom: 12,
  },

  header: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Semibold',
    flex: 1,
    flexWrap: 'wrap',
  },
  name: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    paddingBottom: 6,
  },
  city: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ClockAndLocation;
