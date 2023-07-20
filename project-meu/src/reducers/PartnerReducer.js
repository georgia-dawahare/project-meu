import { ActionTypes } from '../actions/PartnerActions';

const initialState = {
  partnerData: {
    uid: '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    penguinColor: '',
    userLastEmotion: 0,
    partnerLastEmotion: 0,
    pairCode: '',
    pairId: '',
    backgroundPhoto: '',
    countryCode: '',
    city: '',
  },
};

const PartnerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case ActionTypes.FETCH_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default PartnerReducer;
