import mongoose, { Schema } from 'mongoose';

const ResponseSchema = new Schema({
    response: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    emote: { type: String }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const ResponseModel = mongoose.model('Response', ResponseSchema);

export default ResponseModel;