import Question from '../models/QuestionModel';

export async function findQuestionById(questionId) {
    try {
        const question = await Question.findById(questionId);
        return question;
    } catch (error) {
        throw new Error(`Find Questions error: ${error}`);
    }
}