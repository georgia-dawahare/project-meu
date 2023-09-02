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
    const responseGroupId = req.params.id;
    try {
        const updatedResponse = await Responses.updateResponse(responseGroupId, req.body);
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

// Get responses by UserId
const handleGetResponsesByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await Responses.findResponsesByUserId(userId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const handleGetResponsesByPartnerId = async (req, res) => {
    const partnerId = req.params.id;
    try {
        const response = await Responses.findResponsesByUserId(partnerId);
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

router.route('/userId/:id')
    .get(handleGetResponsesByUserId);

router.route('/partnerId/:id')
    .get(handleGetResponsesByPartnerId);
export default router;
