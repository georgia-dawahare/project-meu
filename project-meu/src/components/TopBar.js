import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons'; 

function TopBar({ navigation }) {
  const daysExample = 1293;
  const [days, setDays] = useState(0);
  const days_text = days + ' days'

  useEffect(() => {
    async function loadData() {
      await setDays(daysExample);
    }

    loadData();
  }, []);

  return (
    <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Feather name="calendar" size={28} color="black" style={{paddingLeft:10}}/>
        </TouchableOpacity>
        <Text style={styles.header}>
          {days_text}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Entypo name="dots-three-vertical" size={28} color="black" style={{paddingRight:7}} />
        </TouchableOpacity>
      </View>
  );

}

const styles = StyleSheet.create({
    topbar: {
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      position: 'fixed',
      top: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'SF-Pro-Display',
        flex: 1,
        flexWrap: 'wrap',
      },
    });


export default TopBar;
