import { Router } from 'express';
import * as Partner from '../controllers/PartnerController';

const router = Router();


// Get user
const handleGetPartner = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Users.findPartnerById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};


router.route('/partner/:id')
    .get(handleGetPartner)



export default router;