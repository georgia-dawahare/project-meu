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
    asdf: '',
  },
};

const PartnerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_PARTNER:
      return { ...state, partnerData: { ...action.payload } };

    default:
      return state;
  }
};

export default PartnerReducer;
