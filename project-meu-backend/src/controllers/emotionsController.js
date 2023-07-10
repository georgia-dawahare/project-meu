import firestoreService from '../services/firestore';

const updateEmotion = async (emotionData, id) => {
  const emotionId = await firestoreService.updateEmotion(emotionData, id);
  return emotionId;
};

const emotionsController = {
  updateEmotion,
};

export default emotionsController;
