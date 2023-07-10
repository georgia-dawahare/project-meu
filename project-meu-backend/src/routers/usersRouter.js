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

// Get user's emotion
router.get('/emotion/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getUserEmotion(user.uid);
    const emotion = data.toString();
    res.status(200).send(emotion);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get user's partner's emotion
router.get('/partner_emotion/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getPartnerEmotion(user.uid);
    const emotion = data.toString();
    res.status(200).send(emotion);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get user's penguin color
router.get('/penguin_color/:uid', async (req, res) => {
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
  // console.log(updatedUser);
  const user = req.params;
  try {
    const uid = await usersController.updateUser(user.uid, updatedUser);
    res.status(200).send(uid);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get user's city
router.get('/locdata/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await usersController.getLocData(user.uid);
    console.log(data);
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
  try {
    const partnerID = await usersController.getPartnerId(pair.uid);
    res.status(200).send(partnerID);
  } catch (e) {
    console.log('Could not find partner ID');
    res.status(500).send(e.message);
  }
});

// Fetch pair date 
router.get('/pairdate/:uid', async (req, res) => {
  const user = req.params;
  try {
    const pairDate = await usersController.getPairDate(user.uid);
    res.status(200).send(pairDate);
  } catch (e) {
    console.log('Could not find relationship start');
    res.status(500).send(e.message);
  }
});

router.post('/code/:uid', async (req, res) => {
  const userId = req.params.uid;
  const userData = req.body;
  try {
    const pairId = await usersController.connectPairs(userId, userData);
    res.status(200).send(pairId);
  } catch (e) {
    console.log('Could not create pair');
    res.status(500).send(e.message);
  }
})


export default router;
