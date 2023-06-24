import { Router } from 'express';
import responsesController from '../controllers-old/responsesController';

const router = Router();

// Create a response group
router.post('/group', async (req, res) => {
  const response = req.body.groupData;
  const { groupId } = req.body;
  try {
    const id = await responsesController.addResponseGroup(response, groupId);
    res.status(200).send(`Successfully created response group: ${id}`);
  } catch (e) {
    console.log('Tried to create response group: ', e);
    res.status(500).send(e.message);
  }
});

// Get response group
router.get('/group/:id', async (req, res) => {
  const groupId = req.params.id;
  try {
    const data = await responsesController.getResponseGroup(groupId);
    if (!data) {
      res.status(202).send(data);
    } else {
      res.status(200).send(data);
    }
  } catch (e) {
    console.log('Tried to fetch response group: ', e);
    res.status(500).send(e.message);
  }
});

// Update response group
router.patch('/group/:id', async (req, res) => {
  const updatedFields = req.body;
  const groupId = req.params.id;
  try {
    await responsesController.updateResponseGroup(groupId, updatedFields);
    res.status(200).send('Successfully updated response group');
  } catch (e) {
    console.log('Tried to update a response group: ', e);
    res.status(500).send(e.message);
  }
});

// Create a response
router.post('/', async (req, res) => {
  const response = req.body.responseData;
  const pair = req.body.currPairId;
  const responseGroup = req.body.groupId;

  try {
    const id = await responsesController.addResponse(response, pair, responseGroup);
    res.status(200).send(`Successfully created response: ${id}`);
  } catch (e) {
    console.log('Tried to create a response: ', e);
    res.status(500).send(e.message);
  }
});

// Fetch a response
router.get('/:id', async (req, res) => {
  const responseId = req.params.id;

  try {
    const data = await responsesController.getResponse(responseId);
    if (!data) {
      res.status(202).send(data);
    } else {
      res.status(200).send(data);
    }
  } catch (e) {
    console.log('Tried to fetch response: ', e);
    res.status(500).send(e.message);
  }
});

// Update a response
router.put('/:id', async (req, res) => {
  const responseId = req.body.currResponseId;
  const updatedFields = req.body.updatedResponse;
  try {
    await responsesController.updateResponse(responseId, updatedFields);
    res.status(200).send('Successfully updated response');
  } catch (e) {
    console.log('Tried to update a response group: ', e);
    res.status(500).send(e.message);
  }
});

// Delete a response
router.delete('/:id', async (req, res) => {
  const responseId = req.params.id;
  try {
    await responsesController.deleteResponse(responseId);
    res.status(200).send('Successfully deleted response');
  } catch (e) {
    console.log('Tried to delete a response: ', e);
    res.status(500).send(e.message);
  }
});

export default router;
