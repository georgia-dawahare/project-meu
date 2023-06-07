/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Font from 'expo-font';
// import DateTimePicker from '@react-native-community/datetimepicker';

function SettingPersonalInfoPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleItemClick = (title) => {
    if (title === 'Birthday') {
      showDatePicker();
    } else {
      console.log('Clicked item:', title);
    }
  };

  const renderDatePicker = () => {
    if (isDatePickerVisible) {
      if (Platform.OS === 'ios') {
        return (
          <DatePickerIOS
            date={selectedDate}
            onDateChange={handleDateChange}
            mode="date"
          />
        );
      } else if (Platform.OS === 'android') {
        DatePickerAndroid.open({
          date: selectedDate,
          mode: 'default',
        }).then((response) => {
          if (response.action === 'dateSetAction') {
            const { year, month, day } = response;
            const selectedAndroidDate = new Date(year, month, day);
            handleDateChange(selectedAndroidDate);
          }
          hideDatePicker();
        });
      }
    }
    return true;
  };

  const formatDate = (date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const dismissDatePicker = () => {
    hideDatePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissDatePicker}>

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
            <Image
              source={require('../../../assets/icons/goback-black.png')}
              style={styles.Icon}
            />
          </TouchableOpacity>

          <Text style={styles.topTitle}>Personal Info</Text>
        </View>
        <View style={styles.contents}>
          <View style={styles.personalInfo}>
            <Text style={styles.name}>Florian</Text>
            <Text style={styles.email}>flori@gmail.com</Text>
          </View>

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick('Birthday')}
          >
            <Text style={styles.title}>Birthday</Text>
            <Text style={styles.Bday}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemClick('Anniversary')}
          >
            <Text style={styles.title}>Anniversary</Text>
            <Text style={styles.Bday}>
              {formatDate(selectedDate)}
            </Text>
          </TouchableOpacity>
        </View>
        {isDatePickerVisible && renderDatePicker()}
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  Icon: {
    height: 24,
    marginRight: 8,
  },

  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    left: 82,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  name: {
    fontWeight: '600',
    fontSize: 22,
    marginBottom: 4,
  },
  email: {
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 16,
    marginTop: 6,
  },
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 0,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },
  personalInfo: {
    marginTop: 32,
  },
});

export default SettingPersonalInfoPage;
