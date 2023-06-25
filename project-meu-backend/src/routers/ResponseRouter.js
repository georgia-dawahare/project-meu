import { Router } from 'express';
import * as Responses from '../controllers/ResponseController';

const router = Router();

// Create response
const handleCreateResponse = async (req, res) => {
    const userId = req.params.id;
    const responseGroupId = req.body.responseGroupId;
    const response = req.body.response;
    try {
        const newResponse = await Responses.createResponse(userId, responseGroupId, response);
        res.json(newResponse);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Update response
const handleUpdateResponse = async (req, res) => {
    const responseId = req.params.id;
    try {
        const updatedResponse = await Responses.updateResponse(responseId, req.body);
        res.json(updatedResponse);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Delete response
const handleDeleteResponse = async (req, res) => {
    const responseId = req.params.id;
    try {
        const deletedResponse = await Responses.deleteResponse(responseId);
        res.json(deletedResponse);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Get response by ID
const handleGetResponse = async (req, res) => {
    const responseId = req.params.id;
    try {
        const response = await Responses.findResponseById(responseId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/:id')
    .post(handleCreateResponse)
    .patch(handleUpdateResponse)
    .delete(handleDeleteResponse)
    .get(handleGetResponse);

export default router;
