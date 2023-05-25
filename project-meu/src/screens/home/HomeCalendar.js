import React, { useRef } from 'react';
import {
  StyleSheet, Text, View, Animated,
} from 'react-native';

function HomeCalendarComponent({ scrollY }) {
  const THRESHOLD = 480;
  const HEADER_HEIGHT = 600;
  const STICKY_HEADER_HEIGHT = 120;

  const inputRange = [0, THRESHOLD];
  const outputRange = [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)];

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
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
            style={{
              fontSize: 20,
            }}
          >
            {'\n'}
            1252
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: 20,
            }}
          >
            {'\n'}
            October 20th, 2019
          </Animated.Text>
        </Animated.Text>
      </Animated.View>

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
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              paddingLeft: 10,
            }}
          >
            Soo Dday List eofijwoeifjwehfoiawejgijewofiweoifhweoifjewoifhiowejfowiejfewjfoweifoiaejfoi
            Soo Dday List eofijwoeifjwehfoiawejgijewofiweoifhweoifjewoifhiowejfowiejfewjfoweifoiaejfoi
            Soo Dday List eofijwoeifjwehfoiawejgijewofiweoifhweoifjewoifhiowejfowiejfewjfoweifoiaejfoi
            Soo Dday List eofijwoeifjwehfoiawejgijewofiweoifhweoifjewoifhiowejfowiejfewjfoweifoiaejfoi
          </Text>
        </View>

        <View />
      </Animated.ScrollView>
    </View>
  );
}

function HomeCalendar() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <HomeCalendarComponent scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    paddingTop: 120,
  },
});

export default HomeCalendar;
