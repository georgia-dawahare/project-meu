import Questions from '../models/QuestionsModel';

export async function findAllQuestions() {
    try {
        const allQuestions = await Questions.find({}).sort({ _id: 1 });
        return allQuestions;
    } catch (error) {
        throw new Error(`Find Questions error: ${error}`);
    }
}