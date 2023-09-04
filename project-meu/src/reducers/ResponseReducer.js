// import { ActionSheetIOS } from 'react-native/types';
// import { startLocationUpdatesAsync } from 'expo-location';
import { ActionTypes } from '../actions/ResponseActions';

const initialState = {
  allResponses: {},
  partnerResponse: {},
  currResponse: {},
  anotherResponse: {},
};

const ResponseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESPONSE:
      return { ...state, currResponse: action.payload };
    case ActionTypes.FETCH_RESPONSES:
      return { ...state, allResponses: action.payload };
    case ActionTypes.FETCH_RESPONSE_PARTNER:
      return { ...state, partnerResponse: action.payload };
    case ActionTypes.FETCH_ANOTHER_RESPONSE:
      return { ...state, anotherResponse: action.payload };
    default:
      return state;
  }
};

export default ResponseReducer;
