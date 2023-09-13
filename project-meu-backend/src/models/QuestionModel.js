import mongoose, { Schema } from "mongoose";

export const QuestionSchema = new Schema({
    _id: { type: Number, required: true },
    question: { type: String, required: true },
    type: { type: String, required: true },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;