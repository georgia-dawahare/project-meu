import mongoose, { Schema } from 'mongoose';

// Primary user created the pair (i.e., the first to sign up)
// Secondary user joined the pair (i.e., the second to sign up)
export const PairSchema = new Schema({
    primaryUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    secondaryUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    relationshipStart: { type: Date },
    requestedRelationshipStart: { type: Date },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const PairModel = mongoose.model('Pair', PairSchema);

export default PairModel;