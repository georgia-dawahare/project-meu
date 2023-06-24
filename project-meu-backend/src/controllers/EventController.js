import Event from '../models/EventModel'

export async function createEvent(eventFields) {
    // Create new event
    const event = new Event();
    event.pairId = eventFields.pairId;
    event.title = eventFields.title;
    event.repeat = eventFields.repeat;
    event.eventDate = eventFields.eventDate;

    try {
        // Await save to db
        const savedEvent = await event.save().then(savedDoc => {
            console.log("Successfully saved event: " + savedDoc); // true
            return savedEvent;
        });;
    } catch (error) {
        throw new Error(`Create event error: ${error}`);
    }
}
