import { ActionTypes } from '../actions/QuestionsActions';

const initialState = {
  questionsData: {
    // uid: '',
    _id: '',
    quesion: '',
    type: '',
  },
};

const QuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_QUESTIONS:
      return { ...state, questionsData: action.payload };
    default:
      return state;
  }
};

export default QuestionsReducer;
