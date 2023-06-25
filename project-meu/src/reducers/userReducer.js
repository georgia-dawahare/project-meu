import { ActionTypes } from '../actions/UserActions';

const initialState = {
  userData: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    penguinColor: '',
    userLastEmotion: 0,
    partnerLastEmotion: 0,
    partnerId: '',
    pairCode: '',
    pairId: '',
    backgroundPhoto: '',
    countryCode: '',
    city: '',
    password: '',
  },
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case ActionTypes.FETCH_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default UserReducer;
