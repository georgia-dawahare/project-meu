import { Router } from 'express';
import * as Users from '../controllers/UserController';

const router = Router();

// Create new user
const handleCreateUser = async (req, res) => {
    try {
        const newUser = await Users.createUser(req.body);
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

router.route('/')
    .post(handleCreateUser);

router.route('/:id')
    .get(handleGetUser)
    .patch(handleUpdateUsesr)
    .delete(handleDeleteUser);

router.route('/emotion/:id')
    .get(handleGetUserEmotion);

export default router;