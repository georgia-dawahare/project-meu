import { ActionTypes } from '../actions/ResponseActions';

const initialState = {
  allResponses: {},
  currResponse: {},
};

const ResponseReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESPONSE:
      return { ...state, allResponses: action.payload };
    case ActionTypes.FETCH_RESPONSES:
      return { ...state, currResponse: action.payload };
    default:
      return state;
  }
};

export default ResponseReducer;
