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
import axios from 'axios'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { apiUrl } from '../constants/constants';

function ClockAndLocation() {
  const [userID, setUserID] = useState('');
  const auth = getAuth();

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
  const [partnerTZ, setPartnerTZ] = useState();
  const [pTime, setPTime] = useState();

  // Dummy variables
  // replace this stuff with the firebase stuff -- city should be a stored parameter
  const partnerCity = 'Atlanta';
  const name1 = 'User';
  const name2 = 'Partner';
  // find this in redux
  const units = 'imperial';

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user;
        setUserID(uid);
      }});}, []);

  useEffect(() => {
    getPartnerID();
  }, [])

  const getPartnerID = async () => {
    let partnerID;
    if (userID) { 
      partnerID = axios.get(`${apiUrl}/users/partner/${userID}`);
      console.log('This is partner id: ', partnerID);
      }
    else {
    console.log('user not logged in')
    }

    return partnerID
  }

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
        setUserCity(data.name);
        setUserTemp(data.main.temp.toFixed(0));
        setRefreshing(false);

        // 
      })
      .catch((error) => {
        console.error(error);
      });
    

    // now, moving onto the partner's data -- make an API call based on the city name
    fetch(`${starterUrl}units=${units}&q=${partnerCity}&appid=${openWeatherKey}`)
      .then((response) => response.json()).then((data) => {
        setPartnerTemp(data.main.temp.toFixed(0));
        setPartnerTZ(data.timezone);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // now we want to move some numbers around to get the time of the partner
  // this is based on the timezone values of open weather API 
  const loadPartnerTZ = async () => {
    // learned how to include timezones here! : https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
    d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;
    utc = localTime + localOffset; 
    const pTime = utc - (1000 * partnerTZ)
    setPTime(pTime);
  };

  useEffect(() => {
    loadForecast();
    // if we have a partner timezone, we want to load the partner timer in 
    partnerTZ && pDate(partnerTZ);
  }, []);


  // used documentation from react-native-analog-clock to set up timer
  // should replace partner's time with timezone of partner
  // basically updates seconds minutes and hours using the nowDate
  // could not get the package with the analog clock to work, so using live clock as it is
  // found here: https://github.com/gaetanozappi/react-native-clock-analog
  const nowDate = () => {
    const d = new Date();
    const minute = d.getMinutes();
    const hour = d.getHours();
    return { minute, hour };
  };

  const nowTimer = () => {
    const { minute, hour } = nowDate();
    const [state, setState] = useState({
      minute,
      hour,
    });

    useEffect(() => {
      setInterval(() => {
        const { minute, hour } = nowDate();
        setState({ minute, hour });
      }, 1000);
    }, [useState]);
    return state;
  };

  // setting default value 
  const pDate = (pTime) => {
    const dP = new Date(pTime);
    const minuteP = dP.getMinutes();
    const hourP = dP.getHours();
    return { minuteP, hourP };
  };
  
  const pTimer = () => {
    const { minuteP, hourP } = pDate();
    const [state, setState] = useState({
      minuteP, 
      hourP,  
    })

    useEffect(() => {
      setInterval(() => {
        const { minuteP, hourP } = pDate();
        setState({ minuteP, hourP });
      }, 1000);
    }, [useState]);

    return state;
  };

  const { minute, hour } = nowTimer();
  const { minuteP, hourP } = pTimer(pTime);

  // font stuff
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
          <Text>{name1}</Text>
          <Text>{userCity}</Text>
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
          <Text style={{ textAlign: 'right' }}>{name2}</Text>
          <Text style={{ textAlign: 'right' }}>{partnerCity}</Text>
          <Text style={{ textAlign: 'right' }}>
            {partnerTemp}
            {'\u00b0'}
            F
          </Text>
        </View>
        <View style={styles.clock}>
          <Text style={styles.clocktext}>{hourP}</Text>
          <Text style={styles.clocktext}>
            :
            {minuteP}
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
    width: '95%',
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'fixed',
    top: 0,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  subSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  header: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Semibold',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default ClockAndLocation;
