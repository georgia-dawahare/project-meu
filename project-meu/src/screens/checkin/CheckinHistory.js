import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import { apiUrl } from '../../constants/constants';
import auth from '../../services/datastore';
import SearchBar from '../../components/Searchbar';

function AnswerContent({ p1ResponseId, p2ResponseId }) {
  const [p1Answer, setP1Answer] = useState('');
  const [p2Answer, setP2Answer] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const p1AnswerData = await getAnswer(p1ResponseId);
        const p2AnswerData = await getAnswer(p2ResponseId);
        setP1Answer(p1AnswerData);
        setP2Answer(p2AnswerData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswers();
  }, [p1ResponseId, p2ResponseId]);

  const getAnswer = async (id) => {
    try {
      const allResponses = await axios.get(`${apiUrl}/responses/${id}`);
      const answer = allResponses.data.response;
      return answer;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>{p1Answer}</Text>
      <Text>{p2Answer}</Text>
    </View>
  );
}

function CheckinHistory({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userID, setuserID] = useState('');
  const [userId, setUserId] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'SF-Pro-Display-Medium': require('../../../assets/fonts/SF-Pro-Display-Medium.otf'),
        'SF-Pro-Display-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    setUserId(auth?.currentUser?.uid);
  }, [userID]);

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${apiUrl}/users/${userId}`);
      const userInfo = user.data;

      if (userInfo) {
        setuserID(userInfo.pair_id);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getQuestion = async () => {
    try {
      const allResponses = await axios.get(`${apiUrl}/responses/group`);
      const alldata = allResponses.data;

      const filteredData = alldata.filter((obj) => obj.id.startsWith(userID)
        && obj.p1_response_id !== ''
        && obj.p2_response_id !== '');

      setResponseData(filteredData);

      return filteredData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handleSearch = async (searchText) => {
    // try {
    //   console.log('rd :    ', responseData);
    //   console.log('input :     ', searchText);
    //   const filteredData = responseData.filter((obj) => {
    //     const questionMatch = obj.question_id;

    //     console.log('question match :       ', questionMatch);
    //     return questionMatch;
    //   });
    try {
      const filteredData = responseData.filter((obj) => {
        // Convert the question_id to string, as the searchText might be a string
        const questionIdString = obj.question_id.toString();

        // Check if the question_id includes the searchText
        return questionIdString.includes(searchText);
      });

      setSearchResults(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnswer = async (id) => {
    try {
      const allResponses = await axios.get(`${apiUrl}/responses/${id}`);

      const answer = allResponses.data.response;

      return answer;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const itemStyle = styles.item;
    const questions = item.question_id;
    const isExpanded = expandedItems.includes(questions);

    return (
      <View>
        <TouchableOpacity style={itemStyle} onPress={() => toggleItem(questions)}>
          <View style={styles.rowContainer}>
            <Text style={styles.itemText}>
              {questions}
            </Text>
            <Text style={styles.itemText}>
              {isExpanded ? '-' : '+'}
            </Text>
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <AnswerContent p1ResponseId={item.p1_response_id} p2ResponseId={item.p2_response_id} />
          </View>
        )}
      </View>
    );
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Checkin')}>
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.Icon}
          />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Check-in History</Text>
      </View>
      <SearchBar onSearch={handleSearch} />

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
            borderWidth: 3,
            borderColor: 'white',
            backgroundColor: 'white',
            overflow: 'hidden',
          }}
        />
        <View>
          <View>
            <View style={styles.contents}>
              {/* <FlatList
                data={responseData}
                renderItem={renderItem}
                keyExtractor={(item) => item.questions}
                contentContainerStyle={styles.listContainer}
                style={styles.questions}
              /> */}
              <FlatList
                data={searchResults.length > 0 ? searchResults : responseData}
                renderItem={renderItem}
                keyExtractor={(item) => item.questions}
                contentContainerStyle={styles.listContainer}
                style={styles.questions}
              />
            </View>
          </View>

        </View>

        <View />
      </Animated.ScrollView>

    </SafeAreaView>

  );
}
export default CheckinHistory;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 32,
    left: 16,
    zIndex: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  scrollContent: {
    paddingTop: 12,
  },
  ddayItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
    marginBottom: 24,
    paddingLeft: 24,
  },
  DdayList: {
    flex: 1,
    flexDirection: 'column',
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  coloredItemText: {
    color: 'rgb(230, 43, 133)',
  },
  questions: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
    left: 65,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
