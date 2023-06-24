import { Router } from 'express';
import emotionsController from '../controllers/emotionsController';

const router = Router();

// Send an emote
router.patch('/:id', async (req, res) => {
  const { emotion } = req.body;
  const userId = req.params;
  try {
    await emotionsController.updateEmotion(emotion, userId.id);
    res.status(200).send("Successfully updated emotion");
  } catch (e) {
    console.log('Tried to update an emotion');
    res.status(500).send(e.message);
  }
});

export default router;
