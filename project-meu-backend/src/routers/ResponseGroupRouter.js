import { Router } from 'express';
import * as ResponseGroups from '../controllers/ResponseGroupController';

const router = Router();

// Create response group
const handleCreateResponseGroup = async (req, res) => {
    const questionID = req.body.quesId;
    const pairID = req.body.pair;
    console.log(req.body);
    try {
        const newResponseGroup = await ResponseGroups.createResponseGroup(questionID, pairID);
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

const handleGetResponseGroupByPairId = async (req, res) => {
    const pairId = req.params.pairId;
    try {
        const responseGroups = await ResponseGroups.findResponseGroupByPairId(pairId);
        // console.log(responseGroups);
        res.json(responseGroups);
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/addgroups')
    .post(handleCreateResponseGroup);

router.route('/:id')
    .patch(handleUpdateResponseGroup)
    .get(handleGetResponseGroup)

router.route('/pair/:pairId')
    .get(handleGetResponseGroupByPairId);

export default router;