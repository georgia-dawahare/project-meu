import { Router } from 'express';
import * as ResponseGroups from '../controllers/ResponseGroupController';

const router = Router();

// Create response group
const handleCreateResponseGroup = async (req, res) => {
    const questionId = req.body.questionId;
    try {
        const newResponseGroup = await ResponseGroups.createResponseGroup(questionId);
        res.json(newResponseGroup);
    } catch (error) {
        res.status(500).json({ error });
    }
}


// Update response group
const handleUpdateResponseGroup = async (req, res) => {
    const responseGroupId = req.params.id;
    try {
        const updatedResponseGroup = await ResponseGroups.updateResponseGroup(responseGroupId, req.body);
        res.json(updatedResponseGroup);
    } catch (error) {
        res.status(500).json({ error });
    }
}


// Get response group
const handleGetResponseGroup = async (req, res) => {
    const responseGroupId = req.params.id;
    try {
        const responseGroup = await ResponseGroups.findResponseGroupById(responseGroupId);
        res.json(responseGroup);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/')
    .post(handleCreateResponseGroup);

router.route('/:id')
    .patch(handleUpdateResponseGroup)
    .get(handleGetResponseGroup);

export default router;