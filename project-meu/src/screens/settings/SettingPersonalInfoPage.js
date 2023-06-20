/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { apiUrl } from '../../constants/constants';

function SettingPersonalInfoPage({ navigation }) {
  const auth = getAuth();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedBDay, setSelectedBDay] = useState(new Date());
  const [selectedFirstDate, setSelectedFistDate] = useState(new Date());
  const [selectedBDayVisible, setSelectedBDayVisible] = useState(false);
  const [selectedAnniversaryVisible, setSelectedAnniversaryVisible] = useState(false);
  const [birthday, setBirthday] = useState('');
  const userID = auth?.currentUser?.uid;

  console.log('user ID :    ', userID);

  const fetchBirthday = async () => {
    // getting and setting user data
    if (userID) {
      try {
        const response = await axios.get(`${apiUrl}/settings/birthday/${userID}`);
        const bday = response.data;
        setBirthday(bday);
      } catch (error) {
        console.log('Error fetching birthday:', error);
      }
    }
  };

  const updateBirthday = async (newBirthday) => {
    if (userID) {
      try {
        await axios.put(`${apiUrl}/settings/birthday/${userID}`, {
          newBirthday,
        });
        fetchBirthday();
      } catch (error) {
        console.log('Error updating birthday:', error);
      }
    }
  };

  useEffect(() => {
    fetchBirthday();
  }, [userID]);

  console.log('bday from firebase:   ', birthday);

  function formatDate(date) {
    const formattedDate = new Date(date);
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const year = formattedDate.getFullYear().toString();
    return `${month}/${day}/${year}`;
  }

  const formattedBirthday = formatDate(birthday);

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

  const handleItemClick = (title) => {
    if (title === 'Birthday') {
      setSelectedBDayVisible(!selectedBDayVisible);
      setSelectedAnniversaryVisible(false);
    } else if (title === 'Anniversary') {
      setSelectedAnniversaryVisible(!selectedAnniversaryVisible);
      setSelectedBDayVisible(false);
    } else {
      console.log('Clicked item:', title);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      setSelectedBDayVisible(false);
      setSelectedAnniversaryVisible(false);
    }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingPage')}>
            <Image
              source={require('../../../assets/icons/back-arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Personal Info</Text>
        </View>

        <FlatList
          data={SettingContents}
          renderItem={({ item }) => (
            <Item title={item.title} onPress={handleItemClick} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
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
