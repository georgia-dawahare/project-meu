import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

// Create user
router.post('/', async (req, res) => {
  const userData = req.body;
  try {
    const uid = await usersController.createUser(userData);
    res.status(200).send(uid);
  } catch (e) {
    console.log('Tried to create user');
    res.status(500).send(e.message);
  }
});

// Get user's name
router.get('/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getName(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Update user data
router.patch('/:uid', async (req, res) => {
  const updatedUser = req.body;
  const user = req.params;
  try {
    const uid = await usersController.updateUser(user.uid, updatedUser);
    res.status(200).send(uid);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
