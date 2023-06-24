import Pair from '../models/PairModel';
import User from '../models/UserModel';
import * as Users from '../controllers/UserController'

// Create new pair
export async function createPair(pairFields) {
    const pair = new Pair();
    pair.primaryUserId = pairFields.primaryUserId;
    pair.secondaryUserId = pairFields.secondaryUserId;
    pair.relationshipStart = pairFields.relationshipStart;

    try {
        // await save to db
        const savedPair = await pair.save();
        return savedPair;
    } catch (error) {
        throw new Error(`create pair error: ${error}`);
    }
};

// Connect pair
export async function connectPair(userId, userData) {
    const userCode = userData.userCode;
    const relationshipStart = userData.relationshipStart;

    try {
        // Find users with matching code
        const matchList = await User.find({ "pairCode": userCode });

        // Create pair if found match
        if (matchList.length === 1) {
            const partnerId = matchList[0]._id;
            const pairData = {
                primaryUserId: partnerId,
                secondaryUserId: userId,
                relationshipStart: relationshipStart,
            }
            const pair = await createPair(pairData);

            if (pair) {
                // Update pair ID for both users
                const userUpdate = {
                    pairCode: userCode,
                    pairId: pair._id
                }
                const partnerUpdate = {
                    pairId: pair._id
                }
                Users.updateUser(userId, userUpdate);
                Users.updateUser(partnerId, partnerUpdate);
                return pair;
            }
        }
    } catch (error) {
        throw new Error(`connect pair error: ${error}`);
    }
};

// Update pair
export async function updatePair(pairId, updatedFields) {
    try {
        // await updating pair by ID
        const updatedPair = await Pair.findOneAndUpdate({ _id: pairId }, updatedFields, { returnOriginal: false });
        return updatedPair; // return *updated* pair
    } catch (error) {
        throw new Error(`update pair error: ${error}`);
    }
};

// Delete pair
export async function deletePair(pairId) {
    try {
        // await find a user by id and delete
        await User.findByIdAndDelete(pairId);
        const success = `Successfully deleted pair with ID: ${pairId}`;
        return success; // return confirmation
    } catch (error) {
        throw new Error(`delete pair error: ${error}`);
    }
}

// Find pair by pair ID
export async function findPairById(pairId) {
    try {
        const pair = await Pair.findById(pairId);
        return pair;
    } catch (error) {
        throw new Error(`find pair by ID error: ${error}`);
    }
};

// Find pair by user ID
export async function findPairByUserId(uid) {
    try {
        const currUser = await Users.findUserById(uid);
        const pairId = currUser.pairId;
        const pair = await findPairById(pairId);
        return pair;
    } catch (error) {
        throw new Error(`find pair by user ID error: ${error}`);
    }
}

// Find primary user by pair ID
export async function findPrimaryUser(pairId) {
    try {
        const pair = await Pair.findById(pairId);
        return pair.primaryUserId;
    } catch (error) {
        throw new Error(`find primary user error: ${error}`);
    }
}

// Find secondary user by pair ID
export async function findSecondaryUser(pairId) {
    try {
        const pair = await Pair.findById(pairId);
        return pair.secondaryUserId;
    } catch (error) {
        throw new Error(`find secondary user error: ${error}`);
    }
}

// Get partner ID by user ID
export async function findPartnerId(uid) {
    try {
        // Find pair
        const pair = await findPairByUserId(uid);
        let partnerId = '';

        // If user is primary user, then partner is secondary.
        // Otherwise, partner is primary user
        if (uid === pair.primaryUserId.toString()) {
            partnerId = pair.secondaryUserId;
        } else if (uid === pair.secondaryUserId.toString()) {
            partnerId = pair.primaryUserId;
        }
        return partnerId;
    } catch (error) {
        throw new Error(`find partner ID error: ${error}`);
    }
}

// Find relationship start by user ID
export async function findRelationshipStart(uid) {
    try {
        // Find pair
        const pair = await findPairById(uid);
        return pair.relationshipStart;
    } catch (error) {
        throw new Error(`find relationship start error: ${error}`);
    }
}

// Send emotion
export async function sendEmotion(uid, emotion) {
    try {
        const partnerId = await findPartnerId(uid);

        // Update partner's partner emotion and user's user emotion
        const partnerUpdate = {
            partnerLastEmotion: emotion
        }
        const userUpdate = {
            userLastEmotion: emotion
        }
        Users.updateUser(uid, userUpdate);
        Users.updateUser(partnerId, partnerUpdate);
        return userUpdate;

    } catch (error) {
        throw new Error(`send emotion error: ${error}`);
    }
}
