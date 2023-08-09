import { Router } from 'express';
import * as Questions from '../controllers/QuestionsController';

const router = Router();

//handle to get all Questions
const handleGetQuestions = async (req, res) => {
    try {
        const allEvents = await Questions.findAllQuestions();
        res.json(allEvents);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/')
    .get(handleGetQuestions);

export default router;