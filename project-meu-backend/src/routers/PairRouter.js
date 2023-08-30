import { Router } from 'express';
import * as Pairs from '../controllers/PairController';

const router = Router();

// Create new pair
const handleConnectPair = async (req, res) => {
    const userId = req.params.id;
    try {
        const newPair = await Pairs.connectPair(userId, req.body.pairCode);
        res.json(newPair);
    } catch (error) {
        res.status(500).json({ error });
    }
};


// Update pair
const handleUpdatePair = async (req, res) => {
    const pairId = req.params.id;
    try {
        const updatedPair = await Pairs.updatePair(pairId, req.body);
        res.json(updatedPair);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Delete pair
const handleDeletePair = async (req, res) => {
    const pairId = req.params.id;
    try {
        const deletedPair = await Pairs.deletePair(pairId);
        res.json(deletedPair);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get pair by user ID
const handleGetPairByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const pair = await Pairs.findPairByUserId(userId);
        res.json(pair);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get partner object using current user ID
const handleGetPartner = async (req, res) => {
    const userId = req.params.id;
    try {
        const partner = await Pairs.findPartner(userId);
        res.json(partner);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get primary user
const handleGetPrimaryUser = async (req, res) => {
    const pairId = req.params.id;
    try {
        const primaryUserId = await Pairs.findPrimaryUser(pairId);
        res.json(primaryUserId);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get secondary user
const handleGetSecondaryUser = async (req, res) => {
    const pairId = req.params.id;
    try {
        const secondaryUserId = await Pairs.findSecondaryUser(pairId);
        res.json(secondaryUserId);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get relationship start
const handleGetRelationshipStart = async (req, res) => {
    const userId = req.params.id;
    try {
        const relationshipStart = await Pairs.findRelationshipStart(userId);
        res.json(relationshipStart);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Send emotion
const handleSendEmotion = async (req, res) => {
    const userId = req.params.id;
    const emotion = req.body.emotion;
    try {
        const updatedUserField = await Pairs.sendEmotion(userId, emotion);
        res.json(updatedUserField);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/:id')
    .post(handleConnectPair)
    .patch(handleUpdatePair)
    .delete(handleDeletePair)
    .get(handleGetPairByUserId);

router.route('/partner/:id')
    .get(handleGetPartner);

router.route('/primary/:id')
    .get(handleGetPrimaryUser);

router.route('/secondary/:id')
    .get(handleGetSecondaryUser);

router.route('/relationship_start/:id')
    .get(handleGetRelationshipStart);

router.route('/emotion/:id')
    .patch(handleSendEmotion);

export default router;