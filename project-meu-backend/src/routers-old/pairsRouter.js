import { Router } from 'express';
import pairsController from '../controllers/pairsController';

const router = Router();

// Create a pair
router.post('/', async (req, res) => {
  const pairData = req.body;
  try {
    const pairId = await pairsController.createPair(pairData);
    res.status(200).send(pairId);
  } catch (e) {
    console.log('Tried to create pair');
    res.status(500).send(e.message);
  }
});

// Delete pair
router.delete('/:pid', async (req, res) => {
  const pair = req.params;
  try {
    await pairsController.deletePair(pair);
    res.status(200).send('Successfully deleted pair');
  } catch (e) {
    console.log('Tried to delete pair');
    res.status(500).send(e.message);
  }
});

// Fetch pair creator
router.get('/creator/:pid', async (req, res) => {
  const pair = req.params;
  try {
    const pairCreator = await pairsController.getPairCreatorId(pair);
    res.status(200).send(pairCreator);
  } catch (e) {
    console.log('Tried to get pair creator ID');
    res.status(500).send(e.message);
  }
});

// Fetch pair
router.get('/:pid', async (req, res) => {
  const pairId = req.params;
  try {
    const pair = await pairsController.getPair(pairId);
    res.status(200).send(pair);
  } catch (e) {
    console.log('Tried to get pair');
    res.status(500).send(e.message);
  }
});

export default router;
