import Event from '../models/EventModel';

export async function createEvent(eventFields) {
    // Create new event
    const event = new Event();
    event.pairId = eventFields.pairId;
    event.title = eventFields.title;
    event.repeat = eventFields.repeat;
    event.eventDate = eventFields.eventDate;

    try {
        // Await save to db
        const savedEvent = await event.save();
        return savedEvent;
    } catch (error) {
        throw new Error(`Create event error: ${error}`);
    }
}

export async function findAllEvents() {
    try {
        const allEvents = await Event.find({}).sort({ eventDate: -1 });
        return allEvents;
    } catch (error) {
        throw new Error(`Find events error: ${error}`);
    }
}

export async function deleteEvent(eventId) {
    try {
        // await find an event by id and delete
        await Event.findByIdAndDelete(eventId);
        const success = `Successfully deleted event with ID: ${eventId}`;
        return success; // return confirmation
    } catch (error) {
        throw new Error(`delete event error: ${error}`);
    }
}
