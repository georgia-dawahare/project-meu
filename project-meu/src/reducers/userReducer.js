import { ActionTypes } from '../actions';

const initialState = {
  user_data: {
    email: '',
    password: '',
    pair_code: '',
    first_name: '',
    last_name: '',
    birthday: '',
    anniversary: '',
  },
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, user_data: { ...state.user_data, ...action.payload } };
    case ActionTypes.GET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default UserReducer;
