import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
// using the package expo-location to prompt the user to allow location access 
import * as Location from 'expo-location'



function ClockAndLocation() {
  // api stuff
  // used the following video tutorial for the following code, with a few modifications for our specific usage\
  // https://youtu.be/NiNLPZsRruY -- tutorial found on medium.com
  const openWeatherKey = '7e003b98d369635004c7ffdcee85e4db'
  const starterUrl = 'https://api.openweathermap.org/data/2.5/weather?'
  
  // user and partner data below: 
  
  const [userCity, setUserCity] = useState('');
  const [userTemp, setUserTemp] = useState();

  // replace this stuff with the firebase stuff -- city should be a stored parameter
  const [partnerCity, setPartnerCity] = useState('New York City')

  // find from city 
  const [partnerTemp, setPartnerTemp] = useState();

  // find this in redux
  const [units, setUnits] = useState('imperial');
  const [refreshing, setRefreshing] = useState(false);


  const loadForecast = async () => {
    setRefreshing(true);
    
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Location Denied.'); 
    }

    // using expo-location to grab user location 
    let location = await Location.getCurrentPositionAsync({});

    // refresher for .then and catching errors: https://www.geeksforgeeks.org/find-what-caused-possible-unhandled-promise-rejection-in-react-native/#
    // make an api call to get the weather 
    fetch(`${starterUrl}units=${units}&lat=${location.coords.latitude.toFixed(2)}&lon=${location.coords.longitude.toFixed(2)}&appid=${openWeatherKey}`)
    .then((response) => response.json()).then((data) => {
      // setForecast(data)
      console.log(data)

      setUserCity(data.name)
      setUserTemp(data.main.temp.toFixed(0))
      setRefreshing(false)
    })
    .catch((error) => {
      console.error(error);
    })

    // now, moving onto the partner's data -- make an API call based on the city name 
    fetch(`${starterUrl}units=${units}&q=${partnerCity}&appid=${openWeatherKey}`)
    .then((response) => response.json()).then((data) => {
        console.log(data)
        setPartnerTemp(data.main.temp.toFixed(0))
    })
    .catch((error) => {
        console.error(error);
    })

  }

  useEffect(() => {
    loadForecast();
  }, [])

  // this will be replaced with firebase 
  const [name1, setName1] = useState('Florian')
  const [name2, setName2] = useState('Catherine')

  // used documentation from react-native-analog-clock to set up timer 
  // should replace partner's time with timezone of partner
  // basically updates seconds minutes and hours using the nowDate
  // could not get the package with the analog clock to work, so using live clock as it is
  // found here: https://github.com/gaetanozappi/react-native-clock-analog
  const nowDate = () => {
      const d = new Date();
      let second = d.getSeconds();
      let minute = d.getMinutes();
      let hour = d.getHours();
      return { second, minute, hour };
  };
  
  const nowTimer = () => {
    const { second, minute, hour } = nowDate();
    const [state, setState] = useState({
      second,
      minute,
      hour,
    });
  
    useEffect(() => {
      setInterval(() => {
        const { second, minute, hour } = nowDate();
        setState({ second, minute, hour });
      }, 1000);
    }, [useState]);
    return state;
  };

  const { second, minute, hour } = nowTimer();
  return (
    <View style={styles.calendar}>
        <View style={styles.subSection}>
            <View style={styles.clock}>
                <Text style={styles.clocktext}>{hour}</Text>
                <Text style={styles.clocktext}>:{minute}</Text>
            </View>
            <View style={styles.list}>
                <Text>{name1}</Text>
                <Text>{userCity}</Text>
                <Text>{userTemp}{'\u00b0'}F</Text>
            </View>
        </View>
        <View style={styles.divider}>
        </View>
        <View style={styles.subSection}>
            <View style={styles.list}>
                <Text style={{textAlign: 'right'}}>{name2}</Text>
                <Text style={{textAlign: 'right'}}>{partnerCity}</Text>
                <Text style={{textAlign: 'right'}}>{partnerTemp}{'\u00b0'}F</Text>
            </View>
            <View style={styles.clock}>
                <Text style={styles.clocktext}>{hour}</Text>
                <Text style={styles.clocktext}>:{minute}</Text>
            </View>
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
    list: {
      flexDirection: 'column',
      flexWrap: 'wrap'
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
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    header: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'SF-Pro-Display',
        flex: 1,
        flexWrap: 'wrap',
      },
    });


export default ClockAndLocation;
