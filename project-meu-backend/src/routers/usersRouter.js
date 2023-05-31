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
router.get('/name/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getName(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get user
router.get('/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getUser(user.uid);
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

// Get user's city
router.get('/city/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getCity(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get user's timezone
router.get('/background/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getBackground(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Fetch partner ID 
router.get('/partner/:uid', async (req, res) => {
  const pair = req.params;
  console.log('pair (special) : ', pair.uid)
  try {
    console.log(pair);
    const partnerID = await usersController.getPartnerId(pair.uid);
    console.log('router', partnerID);
    res.status(200).send(`success, ${partnerID}`);
  } catch (e) {
    console.log('Could not find partner ID');
    res.status(500).send(e.message);
  }
});

export default router;
