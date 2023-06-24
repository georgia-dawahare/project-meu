import { Router } from 'express';
import * as Events from '../controllers/EventController';

const router = Router();

// Create new event
const handleCreateEvent = async (req, res) => {
    try {
        const event = await Events.createEvent(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Find all events
const handleGetEvents = async (req, res) => {
    try {
        const allEvents = await Events.findAllEvents();
        res.json(allEvents);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Delete event
const handleDeleteEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Events.deleteEvent(eventId);
        res.json(deletedEvent);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/')
    .post(handleCreateEvent)
    .get(handleGetEvents);

router.route('/:id')
    .delete(handleDeleteEvent);

export default router;

