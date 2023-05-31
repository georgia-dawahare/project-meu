import { ActionTypes } from '../actions';

const initialState = {
  email: '',
  password: '',
  pair_code: '',
  first_name: '',
  last_name: '',
  birthday: '',
  anniversary: '',
};

const CountReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};
export default CountReducer;
