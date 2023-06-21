import firestoreService from '../services/firestore';

const createEvent = async (eventData) => {
  const eventId = await firestoreService.createEvent(eventData);
  return eventId;
};

const getEvents = async () => {
  const eventList = await firestoreService.getEvents();
  return eventList;
};


const deleteEvent = async (eventId) => {
  const resBool = await firestoreService.deleteEvent(eventId);
  return resBool;
};

const eventsController = {
  createEvent,
  getEvents,
  deleteEvent,
};

export default eventsController;
