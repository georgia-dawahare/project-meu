import firestoreService from '../services/firestore';

const getQuestion = async (qid) => {
    const question = await firestoreService.getQuestion(qid);
    console.log('controller call finished');
    return question;
  };

const questionsController = {
    getQuestion
};

export default questionsController;