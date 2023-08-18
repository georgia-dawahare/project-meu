import { ActionTypes } from '../actions/PairActions';

const initialState = {
  pairData: {
    _id: '',
    primaryUserId: '',
    secondaryUserId: '',
    relationshipStart: '',
    requestedRelationshipStart: '',
  },
};

const PairReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_PAIR:
      // return { ...state, ...action.payload };
      return { ...state, pairData: { ...state.pairData, ...action.payload } };
    case ActionTypes.UPDATE_PAIR:
      return { ...state, pairData: { ...state.pairData, ...action.payload } };
    default:
      return state;
  }
};

export default PairReducer;
