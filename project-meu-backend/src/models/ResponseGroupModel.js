import mongoose, { Schema } from "mongoose";

export const ResponseGroupSchema = new Schema({
    responseId1: { type: Schema.Types.ObjectId, ref: 'Response', required: true },
    responseId2: { type: Schema.Types.ObjectId, ref: 'Response', required: true },
    questionId: { type: Number, required: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const ResponseGroupModel = mongoose.model('ResponseGroup', ResponseGroupSchema);

export default ResponseGroupModel;