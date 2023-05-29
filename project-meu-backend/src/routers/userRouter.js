import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await userController.getName(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  const userData = req.body;
  try {
    const uid = await userController.createUser(userData);
    res.status(200).send(`User created with uid: ${uid}`);
  } catch (e) {
    console.log(e.message);
    console.log('Tried to create user');
    res.status(500).send(e.message);
  }
});

router.patch('/:uid', async (req, res) => {
  const updatedUser = req.body;
  const user = req.params;
  try {
    const uid = await userController.updateUser(user.uid, updatedUser);
    res.status(200).send(`User updated with uid: ${uid}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
