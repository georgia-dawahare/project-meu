import mongoose, { Schema } from "mongoose";

export const ResponseGroupSchema = new Schema({
    questionId: { type: Number, required: true },
    pairId: { type: Schema.Types.ObjectId, required: true, ref: 'Pair' },
    userResponseId: { type: Schema.Types.ObjectId, ref: 'Response' },
    partnerResponseId: { type: Schema.Types.ObjectId, ref: 'Response' },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const ResponseGroupModel = mongoose.model('ResponseGroup', ResponseGroupSchema);

export default ResponseGroupModel;