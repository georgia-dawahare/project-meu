import { Router } from 'express';
import settingsController from '../controllers/settingsController';

const router = Router();

// Get user's birthday
router.get('/birthday/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await settingsController.getBirthday(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

export default router;
