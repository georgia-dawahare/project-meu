import { Router } from 'express';
import * as ResponseGroups from '../controllers/ResponseGroupController';

const router = Router();

// Create response group
const handleCreateResponseGroup = async (req, res) => {
    const questionID = req.body.quesId;
    const pairID = req.body.pair;
    console.log(req.body);
    try {
        // const newResponseGroup = await ResponseGroups.createResponseGroup(questionId);
        // res.json(newResponseGroup);
        console.log("here2");
        const newResponseGroup = await ResponseGroups.createResponseGroup2(questionID, pairID);
        console.log("here?3");
        res.json(newResponseGroup);
        console.log("here?4");
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

router.route('/addgroups')
    .post(handleCreateResponseGroup);

router.route('/:id')
    .patch(handleUpdateResponseGroup)
    .get(handleGetResponseGroup);

export default router;