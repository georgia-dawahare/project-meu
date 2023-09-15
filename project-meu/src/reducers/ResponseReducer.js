// import { ActionSheetIOS } from 'react-native/types';
// import { startLocationUpdatesAsync } from 'expo-location';
import { ActionTypes } from '../actions/ResponseActions';

const initialState = {
  allResponses: {},
  partnerResponse: {
    response: '',
    createdAt: '',
    updatedAt: '',
  },
  userResponse: {
    response: '',
    createdAt: '',
    updatedAt: '',
  },
  anotherResponse: {},
};

const ResponseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_RESPONSE:
      return { ...state, userResponse: action.payload };
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { ...state, userResponse: { ...state.userResponse, ...action.payload } };
    case ActionTypes.FETCH_RESPONSES:
      return { ...state, allResponses: action.payload };
    case ActionTypes.FETCH_PARTNER_RESPONSE:
      return { ...state, partnerResponse: action.payload };
    case ActionTypes.FETCH_ANOTHER_RESPONSE:
      return { ...state, anotherResponse: action.payload };
    default:
      return state;
  }
};

export default ResponseReducer;
