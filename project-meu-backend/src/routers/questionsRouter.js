import { Router } from 'express';
import questionsController from '../controllers/questionsController';

const router = Router();

// get question from id
router.get('/questions/:qid', async (req, res) => {
    const questionId = req.params;
    console.log('question id', questionId);
    try {
      const data = await questionsController.getQuestion(questionId);
      console.log('router call finished')
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

export default router;