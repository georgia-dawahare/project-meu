import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image,
} from 'react-native';

const questionsData = [
  {
    question: 'What is your favorite memory of us together?',
    type: 'text',
    partner1: 'In the Green',
    partner2: 'In the libraray',
  },
  {
    question: 'What is your favorite thing about me?',
    type: 'text',
    partner1: 'Everything',
    partner2: 'Your shoulder',
  },
  {
    question: 'What is one thing you\'ve always wanted to tell me, but haven\'t?',
    type: 'text',
    partner1: 'I love you',
    partner2: 'we do not have anything!',
  },
  {
    question: 'What is your favorite place to go on a date?',
    type: 'text',
    partner1: 'TukTuk',
    partner2: 'Boston',
  },
  {
    question: 'What was your first impression of me?',
    type: 'text',
    partner1: 'Sassy',
    partner2: 'Handsome',
  },
  {
    question: 'What is one thing that makes you smile every time you think about it?',
    type: 'text',
    partner1: 'Your Selfie(My wallpaper!)',
    partner2: 'Your silly jokes',
  },
  {
    question: 'What is your favorite thing to do with me?',
    type: 'text',
    partner1: 'Personality',
    partner2: 'Your passion',
  },
];

function CheckinHistory({ navigation }) {
  const [expandedList, setExpandedList] = useState([]);

  const toggleAccordion = (index) => {
    const expandedIndex = expandedList.indexOf(index);
    if (expandedIndex !== -1) {
      setExpandedList((prevList) => [...prevList.slice(0, expandedIndex), ...prevList.slice(expandedIndex + 1)]);
    } else {
      setExpandedList((prevList) => [...prevList, index]);
    }
  };

  return (
    <SafeAreaView style={styles.all}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Check-in History</Text>
      </View>
      <View style={styles.Accordcontainer}>
        {questionsData.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <TouchableOpacity style={styles.Accordheader} onPress={() => toggleAccordion(index)}>
              <Text style={styles.headerText}>
                {item.question}
              </Text>
            </TouchableOpacity>
            <View style={styles.space} />
            {expandedList.includes(index) && (
              <View style={styles.content}>

                <View style={styles.partner1}>
                  <Image
                    source={require('../../../assets/images/penguin-checkin.png')}
                  />
                  <Text style={styles.contentText}>
                    {item.partner1}
                  </Text>
                </View>
                <View style={styles.partner2}>
                  <Image
                    source={require('../../../assets/images/penguin-checkin.png')}
                  />
                  <Text style={styles.contentText}>
                    {item.partner2}
                  </Text>
                </View>

              </View>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#F4F4F4',
  },
  containerwhole: {
    flex: 1,
  },
  Accordcontainer: {
    backgroundColor: '#F4F4F4',
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 60,
  },
  Icon: {
    height: 24,
    marginRight: 8,
  },

  topTitle: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 20,
    left: 70,
  },
  listItem: {
    marginBottom: 10,
  },

  headerText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 24,
  },
  content: {
    width: 370,
    fontFamily: 'SF-Pro-Display-Regular',
    backgroundColor: '#ff',
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  contentText: {
    marginLeft: 24,
  },
  Accordheader: {
    marginTop: 10,
    marginBottom: 10,
  },
  partner1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  partner2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  space: {
    padding: 10,
  },
});

export default CheckinHistory;
