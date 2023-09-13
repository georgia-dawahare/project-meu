import { ActionTypes } from '../actions/ResponseGroupActions';

const initialState = {
  allResponseGroups: {},
  dailyResponseGroup: {
    questionId: '',
    pairId: '',
    userResponseId: '',
    partnerResponseId: '',
  },
};

const ResponseGroupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_RESPONSE_GROUPS:
      return { ...state, allResponseGroups: action.payload };
    case ActionTypes.FETCH_RESPONSE_GROUP:
      return { ...state, dailyResponseGroup: action.payload };
    default:
      return state;
  }
};

export default ResponseGroupReducer;
