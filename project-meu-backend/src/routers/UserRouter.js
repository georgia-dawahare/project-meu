import { Router } from 'express';
import * as Users from '../controllers/UserController';

const router = Router();

// Create new user
const handleCreateUser = async (req, res) => {
    try {
        const newUser = await Users.createUser(req.body.uid, req.body.email);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Update user
const handleUpdateUsesr = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await Users.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Delete user
const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await Users.deleteUser(userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get user
const handleGetUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Users.findUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Get user by Firestore UID
const handlGetFirestoreUser = async (req, res) => {
    const firestoreUid = req.params.id;
    try {
        const user = await Users.findFirestoreUser(firestoreUid);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}

// Get user's last emotion
const handleGetUserEmotion = async (req, res) => {
    const userId = req.params.id;
    try {
        const userEmotion = await Users.getUserEmotion(userId);
        res.json(userEmotion);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Get partner's last emotion
const handleGetPartnerEmotion = async (req, res) => {
    const userId = req.params.id;
    try {
        const partnerEmotion = await Users.getPartnerEmotion(userId);
        res.json(partnerEmotion);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Get user's location data
const handleGetUserLocation = async (req, res) => {
    const userId = req.params.id;
    try {
        const userLocation = await Users.getUserLocationData(userId);
        res.json(userLocation);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Get user's background photo
const handleGetUserBackground = async (req, res) => {
    const userId = req.params.id;
    try {
        const userBackground = await Users.getUserBackground(userId);
        res.json(userBackground);
    } catch (error) {
        res.status(500).json({ error });
    }
}

router.route('/')
    .post(handleCreateUser);

router.route('/:id')
    .get(handleGetUser)
    .patch(handleUpdateUsesr)
    .delete(handleDeleteUser);

router.route('/emotion/:id')
    .get(handleGetUserEmotion);

router.route('/partner_emotion/:id')
    .get(handleGetPartnerEmotion);

router.route('/location/:id')
    .get(handleGetUserLocation);

router.route('/background/:id')
    .get(handleGetUserBackground);

router.route('/firestore/:id')
    .get(handlGetFirestoreUser);

export default router;