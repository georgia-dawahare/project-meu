import { ActionTypes } from '../actions/ResponseGroupActions';

const initialState = {
  allResponseGroups: {},
  currResponseGroup: {},
};

const ResponseGroupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESPONSE_GROUPS:
      return { ...state, allResponseGroups: action.payload };
    case ActionTypes.FETCH_RESPONSE_GROUP:
      return { ...state, currResponseGroup: action.payload };
    default:
      return state;
  }
};

export default ResponseGroupReducer;
