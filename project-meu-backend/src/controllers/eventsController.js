import firestoreService from '../services/firestore';

// Soo is working on this
const createEvent = async (eventData) => {
  const eventId = await firestoreService.createEvent(eventData);
  return eventId;
};

const eventsController = {
  createEvent,
};

export default eventsController;
