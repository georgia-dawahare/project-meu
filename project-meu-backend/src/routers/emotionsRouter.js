import { Router } from 'express';
import emotionsController from '../controllers/emotionsController';

const router = Router();

// Send an emote
router.patch('/', async (req, res) => {
  const emotionData = req.body;
  const userId = req.params;
  try {
    await emotionsController.updateEmotion(emotionData, userId);
    res.status(200).send("Successfully updated emotion");
  } catch (e) {
    console.log('Tried to send an emote');
    res.status(500).send(e.message);
  }
});

export default router;
