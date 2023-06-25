import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    // Registration info
    uid: { type: String, required: true },  // Firebase auth uid
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    birthday: { type: Date },
    penguinColor: { type: String },

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