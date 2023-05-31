import firestoreService from '../services/firestore';

const updateEmotion = async (emotionData) => {
  const emotionId = await firestoreService.updateEmotion(emotionData);
  return emotionId;
};

const emotionsController = {
  updateEmotion,
};

export default emotionsController;
