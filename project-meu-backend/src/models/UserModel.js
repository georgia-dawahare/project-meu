import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    // Registration info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    penguinColor: { type: String, required: true },

    // Defaults
    userLastEmotion: { type: Number, default: 0 },
    partnerLastEmotion: { type: Number, default: 0 },

    // Info retrieved after registration
    pairCode: { type: Number },
    pairId: { type: Schema.Types.ObjectId, ref: 'Pair' },
    backgroundPhoto: { type: String },
    countryCode: { type: String },
    city: { type: String },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;