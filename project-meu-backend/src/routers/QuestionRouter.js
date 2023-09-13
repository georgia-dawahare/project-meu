import { Router } from 'express';
import * as Questions from '../controllers/QuestionController';

const router = Router();

// Get a question with a given ID
const handleGetQuestion = async (req, res) => {
    let questionId = req.params.id;
    try {
        const question = await Questions.findQuestionById(questionId);
        res.json(question);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/:id')
    .get(handleGetQuestion);

export default router;