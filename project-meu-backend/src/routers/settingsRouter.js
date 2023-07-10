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

//update birthday
router.put('/birthday/:uid', async (req, res) => {
  const { uid } = req.params;
  const { newBirthday } = req.body;
  try {
    await settingsController.updateBirthday(uid, newBirthday);
    res.status(200).send('Successfully updated birthday');
  } catch (error) {
    console.log('Failed updating a new birthday:', error);
    res.status(500).send(error.message);
  }
});


export default router;
