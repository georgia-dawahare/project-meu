import firestoreService from '../services/firestore';

const sendEmotion = async (emotionData) => {
  const emotionId = await firestoreService.sendEmotion(emotionData);
  return emotionId;
};

const emotionsController = {
  sendEmotion,
};

export default emotionsController;
