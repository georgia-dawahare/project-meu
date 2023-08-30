import { Router } from 'express';
import eventsController from '../controllers/eventsController';

const router = Router();

// Create new event
router.post('/', async (req, res) => {
  const eventData = req.body;
  try {
    const eventId = await eventsController.createEvent(eventData);
    console.log('event id :     ',eventId); //null
    if (eventId) {
      res.status(200).send(eventId);
    } else {
      console.log('Tried to create event1');
      res.status(500).send('Create event failed');
    }
  } catch (e) {
    console.log('Tried to create event2');
    res.status(500).send(e.message);
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const eventList = await eventsController.getEvents();
    res.status(200).send(eventList);
  } catch (e) {
    console.log('Tried to fetch all events');
    res.status(500).send(e.message);
  }
});


// Delete event
router.delete('/:id', async (req, res) => {
  const eventId = req.params;
  try {
    await eventsController.deleteEvent(eventId);
    res.status(200).send('Successfully deleted event');
  } catch (e) {
    console.log('Tried to delete event');
    res.status(500).send(e.message);
  }
});

export default router;
