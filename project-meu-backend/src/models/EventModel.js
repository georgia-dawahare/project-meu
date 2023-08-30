import mongoose, { Schema } from 'mongoose';

export const EventSchema = new Schema({
    pairId: { type: Schema.Types.ObjectId, ref: 'Pair', required: true },
    title: { type: String, required: true },
    repeat: { type: String, required: true },
    eventDate: { type: Date, required: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;