import mongoose, { Schema } from "mongoose";

export const QuestionsSchema = new Schema({
    _id: { type: Number, required: true },
    questions: { type: Schema.Types.String, required: true },
    type: { type: Schema.Types.String, required: true },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const QuestionsModel = mongoose.model('Questions', QuestionsSchema);

export default QuestionsModel;