import { ActionTypes } from '../actions/UserActions';

const initialState = {
  userData: {
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
    asdf: '',
  },
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
    asdf: '',
  },
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case ActionTypes.FETCH_USER:
      return { ...state, ...action.payload };
    case ActionTypes.FETCH_PARTNER:
      return { ...state, partnerData: { ...state.partnerData, ...action.payload } };
    default:
      return state;
  }
};

export default UserReducer;
