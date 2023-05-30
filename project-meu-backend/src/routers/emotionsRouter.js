import { Router } from 'express';
import emotionsController from '../controllers/emotionsController';

const router = Router();

// Send an emote
router.post('/', async (req, res) => {
  const emotionData = req.body;
  try {
    const emotionId = await emotionsController.sendEmotion(emotionData);
    res.status(200).send(emotionId);
  } catch (e) {
    console.log('Tried to send an emote');
    res.status(500).send(e.message);
  }
});

export default router;
