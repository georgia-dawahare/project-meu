import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import AnalogClock from 'react-native-clock-analog';



function ClockAndLocation() {
  const temp1 = '55'
  const temp2 = '70'
  const [name1, setName1] = useState('Florian')
  const [name2, setName2] = useState('Catherine')
  const [loc1, setLoc1] = useState('Berlin')
  const [loc2, setLoc2] = useState('California')


// to be used with firebase
//   useEffect(() => {
//     async function loadData() {
//       await setDays(daysExample);
//     }

//     loadData();
//   }, []);

// stuff for loading in custom time -- currently not working
// first clock using current date and time, but for some reason not updating 
// second clock has autostart on and appears to be working -- need to troubleshoot more

// used documentation from react-native-analog-clock to set up timer 
// basically updates seconds minutes and hours using the nowDate
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
            <View style={styles.list}>
            <AnalogClock
            colorClock="#000000"
            colorNumber="#FFFFFF"
            colorCenter="#FFFFFF"
            colorHour="#797D51"
            colorMinutes="#FFFFFF"
            size={75}
            hour={hour}
            minutes={minute}
            seconds={second}
            showSeconds
            />
            </View>
            <View style={styles.list}>
                <Text>{name1}</Text>
                <Text>{loc1}</Text>
                <Text>{temp1}{'\u00b0'}</Text>
            </View>
        </View>
        <View style={styles.divider}>
        </View>
        <View style={styles.subSection}>
            <View style={styles.list}>
                <Text style={{textAlign: 'right'}}>{name2}</Text>
                <Text style={{textAlign: 'right'}}>{loc2}</Text>
                <Text style={{textAlign: 'right'}}>{temp2}{'\u00b0'}</Text>
            </View>
            <View style={styles.list}>
            <AnalogClock
                colorClock="#F96EB0"
                colorNumber="#E7E8DC"
                colorCenter="#FFFFFF"
                colorHour="#E42B84"
                colorMinutes="#FFFFFF"
                size={75}
                autostart={true}
                showSeconds
        />
            </View>
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
    list: {
      flexDirection: 'column',
    },

    divider: {
        borderLeftWidth: 1,
        height: 60,
        marginLeft: -0.5,
        top: 20,
        borderColor: '#D9D9D9',
    },

    calendar: {
      width: '90%',
      height: 100,
      borderRadius: 20,
      backgroundColor: 'white',
      position: 'fixed',
      top: 0,
      left: 20,
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
