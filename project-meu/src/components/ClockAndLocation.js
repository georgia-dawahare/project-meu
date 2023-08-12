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
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/UserActions';

function ClockAndLocation() {
  // used the following video tutorial for the open weather API code, with a few modifications for our specific usage\
  // https://youtu.be/NiNLPZsRruY -- tutorial found on medium.com
  // basically showing me how to make api calls and such

  // api stuff
  // TODO: Move this to a credentials file
  const openWeatherKey = '7e003b98d369635004c7ffdcee85e4db';
  const starterUrl = 'https://api.openweathermap.org/data/2.5/weather?';

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.userData);
  const partner = useSelector((state) => state.partnerState.partnerData);
  const [fontLoaded, setFontLoaded] = useState(false);

  // user and partner data below:
  const [userTemp, setUserTemp] = useState();
  const [partnerTemp, setPartnerTemp] = useState(0);
  const [pTime, setPTime] = useState();

  // loading
  const [loading, setLoading] = useState(true);

  // find this in redux -- this will be a future change to implement
  const units = 'imperial';

  function getUserWeather(location) {
    // refresher for .then and catching errors: https://www.geeksforgeeks.org/find-what-caused-possible-unhandled-promise-rejection-in-react-native/#
    // make an api call to get the weather
    fetch(`${starterUrl}units=${units}&lat=${location.coords.latitude.toFixed(2)}&lon=${location.coords.longitude.toFixed(2)}&appid=${openWeatherKey}`)
      .then((response) => response.json()).then((data) => {
        // sending firebase the user's city and country data
        const userLocData = {
          city: data.name,
          country_code: data.sys.country,
        };

        dispatch(updateUser(user._id, userLocData));
        // }

        // setUserCity(data.name);
        setUserTemp(data?.main?.temp?.toFixed(0));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getPartnerWeather() {
    // now, moving onto the partner's data -- make an API call based on the city name
    // to implement -- country code
    fetch(`${starterUrl}units=${units}&q=${partner.city},${partner.countryCode}&appid=${openWeatherKey}`)
      .then((response) => response.json()).then((data) => {
        setPartnerTemp(data?.main?.temp?.toFixed(0));

        // now we want to move some numbers around to get the time of the partner
        // this is based on the timezone values of open weather API
        // learned how to include timezones here! : https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
        const date = new Date();
        const localTime = date.getTime();
        const localOffset = date.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        setPTime(utc + (1000 * data.timezone));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // again, from video tutorial
  // use this to load in weather data & some time data
  const loadForecast = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Location Denied.');
    }

    // using expo-location to grab user location
    const location = await Location.getCurrentPositionAsync({});

    getUserWeather(location);
    getPartnerWeather();

    if (userTemp) setLoading(false);
  };

  // changed useEffect to depend on partner country because it is the last
  // const we grab before the api call
  useEffect(() => {
    loadForecast();
  }, []);

  // used documentation from react-native-analog-clock to set up timer
  // basically updates seconds minutes and hours using the nowDate
  // a bit different for partner -- work with timezone
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
        // eslint-disable-next-line no-shadow
        const { minute, hour } = nowDate();
        setState({ minute, hour });
      }, 1000);

      return () => clearInterval(state);
    }, []);

    return state;
  };

  // setting default value
  const pDate = () => {
    const dP = new Date(pTime);
    const minuteP = dP.getMinutes();
    const hourP = dP.getHours();
    return { minuteP, hourP };
  };

  // thank you chatGPT -- will specify the lines that came from bug fixing thanks to chatGPT
  const pTimer = () => {
    const [state, setState] = useState({
      minuteP: '--',
      hourP: '--',
    });

    useEffect(() => {
      // made this function asynchronous so it only calls when we have the partner timezone
      const fetchTimeP = async () => {
        const { minuteP, hourP } = pDate();
        setState({
          // here chatGPT suggested we use '?' in order to substitute the NaN values if we come across them
          minuteP: Number.isNaN(minuteP) ? new Date(pTime).getMinutes() : minuteP,
          hourP: Number.isNaN(hourP) ? new Date(pTime).getHours() : hourP,
        });
      };

      if (pTime) {
        fetchTimeP();
      }
    }, [pTime]);

    return state;
  };

  // initializing the clocks
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

  // if we haven't loaded the font or the loadForecast isn't done
  if (!fontLoaded || loading) {
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
          <Text>{user.firstName}</Text>
          <Text>
            {user.city}
          </Text>
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
          <Text style={styles.partnerInfo}>{partner.name}</Text>
          <Text style={styles.partnerInfo}>{partner.city}</Text>
          <Text style={styles.partnerInfo}>
            {partnerTemp}
            {partnerTemp ? ('\u00b0F') : null}
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
  partnerInfo: {
    textAlign: 'right',
  },
});

export default ClockAndLocation;
