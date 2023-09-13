import { ActionTypes } from '../actions/QuestionActions';

const initialState = {
  dailyQuestion: {
    question: '',
    type: '',
    id: '',
  },
};

const QuestionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_DAILY_QUESTION:
      return { ...state, dailyQuestion: action.payload };
    default:
      return state;
  }
};

export default QuestionsReducer;
