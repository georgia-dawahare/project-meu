// https://github.com/kosaikham/twitter-scrollable-header-clone
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, SafeAreaView, Animated, Image, View, Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

function DdayList({ date, title, iconName }) {
  return (
    <View style={styles.ddayItem}>
      <Text style={styles.ddaydate}>{date}</Text>
      <Text style={styles.ddayTitle}>{title}</Text>
      <Ionicons name={iconName} size={24} color="black" style={styles.icon} />
    </View>
  );
}

function HomeCalendar({ navigation }) {
  const scrollY = new Animated.Value(0);
  const THRESHOLD = 480;
  const HEADER_HEIGHT = 600;
  const STICKY_HEADER_HEIGHT = 120;

  const inputRange = [0, THRESHOLD];
  const outputRange = [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)];

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'SF-Pro-Display-Bold': '../../../assets/fonts/SF-Pro-Display-Bold.otf',
        'SF-Pro-Display-Semibold': '../../../assets/fonts/SF-Pro-Display-Semibold.otf',
        'SF-Pro-Display-Medium': '../../../assets/fonts/SF-Pro-Display-Medium.otf',
      });
    }

    loadFont();
  }, []);

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Image
        source="../../../assets/icons/goback-black.png"
        style={styles.Icon}
      />
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: HEADER_HEIGHT,
            transform: [{ translateY }],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.headerText,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, THRESHOLD],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              textAlign: 'center',
            },
          ]}
        >
          Together for
          <Animated.Text
            style={styles.bgtextday}
          >
            {'\n'}
            1252
          </Animated.Text>
          <Animated.Text
            style={styles.bgtextdate}
          >
            {'\n'}
            October 20th, 2019
          </Animated.Text>
        </Animated.Text>
      </Animated.View>

      {/* <SwipeablePanel
        fullWidth
        // isActive={this.state.swipeablePanelActive}
        // onClose={this.closePanel}
        // onPressCloseButton={this.closePanel}
      >
        <Text>Hi</Text>
      </SwipeablePanel> */}

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        style={{
          flex: 1,
        }}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={{
            width: 390,
            height: 40,
            borderWidth: 3,
            borderColor: 'white',
            marginTop: HEADER_HEIGHT - 120,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}
        />
        <View>
          <View>
            <Text style={styles.annivtitle}>
              Upcoming Anniversaries
            </Text>
            <View>
              <DdayList date="05/20" title="Dday 1" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 2" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 3" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 4" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 5" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 6" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 7" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 1" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 2" iconName="ios-calendar" />
              <DdayList date="05/20" title="Dday 3" iconName="ios-calendar" />
            </View>
          </View>
        </View>

        <View />
      </Animated.ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  Icon: {
    position: 'absolute',
    top: 64,
    left: 24,
    height: 24,
    zIndex: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'lightskyblue',
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    paddingTop: 120,
  },
  ddayItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
    marginBottom: 24,
    paddingLeft: 24,
  },
  ddaydate: {
    fontSize: 16,
  },

  ddayTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: 16,
    paddingLeft: 24,
  },
  DdayList: {
    flex: 1,
    flexDirection: 'column',
  },
  annivtitle: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 20,
    paddingLeft: 24,
    marginBottom: 32,
  },
  bgtextday: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 52,
  },
  bgtextdate: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 18,
    lineHeight: 36,
  },
});

export default HomeCalendar;