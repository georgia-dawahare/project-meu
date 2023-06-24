import { Router } from 'express';
import * as Events from '../controllers/EventController';

const router = Router();

// Create new event
const handleCreateEvent = async (req, res) => {
    try {
        const eventId = await Events.createEvent(req.body);
        res.json(eventId);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/')
    .post(handleCreateEvent);

export default router;

