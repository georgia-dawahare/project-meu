import mongoose, { Schema } from "mongoose";

export const ResponseGroupSchema = new Schema({
    questionId: { type: Number, required: true },
    responseId1: { type: Schema.Types.ObjectId, ref: 'Response' },
    responseId2: { type: Schema.Types.ObjectId, ref: 'Response' },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const ResponseGroupModel = mongoose.model('ResponseGroup', ResponseGroupSchema);

export default ResponseGroupModel;