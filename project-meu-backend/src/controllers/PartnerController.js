import Partner from '../models/PartnerModel'


// Get user by ID
export async function findPartnerById(uid) {
    const partner = await Partner.findById(uid);
    return partner;
};
