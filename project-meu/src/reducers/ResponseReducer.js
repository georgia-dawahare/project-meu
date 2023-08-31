// import { ActionSheetIOS } from 'react-native/types';
import { ActionTypes } from '../actions/ResponseActions';

const initialState = {
  allResponses: {},
  partnerResponse: {},
  // currResponse: {},
};

const ResponseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESPONSE:
      return { ...state, allResponses: action.payload };
    case ActionTypes.FETCH_RESPONSES:
      return { ...state, allResponses: action.payload };
    case ActionTypes.FETCH_RESPONSE_PARTNER:
      return { ...state, partnerResponse: action.payload };
    default:
      return state;
  }
};

export default ResponseReducer;
