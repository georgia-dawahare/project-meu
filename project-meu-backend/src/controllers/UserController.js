import User from '../models/UserModel'

// Create new user
export async function createUser(userId, userEmail) {
    const user = new User();
    user.uid = userId;
    user.email = userEmail;

    try {
        // await save to db
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw new Error(`create user error: ${error}`);
    }
};

// Update user 
export async function updateUser(uid, updatedFields) {
    try {
        // await updating user by ID
        const updatedUser = await User.findOneAndUpdate({ _id: uid }, updatedFields, { returnOriginal: false });
        return updatedUser; // return *updated* user
    } catch (error) {
        throw new Error(`update user error: ${error}`);
    }
};

// Delete user
export async function deleteUser(uid) {
    try {
        // await find a user by id and delete
        await User.findByIdAndDelete(uid);
        const success = `Successfully deleted user with ID: ${uid}`;
        return success; // return confirmation
    } catch (error) {
        throw new Error(`delete user error: ${error}`);
    }
}

// Get user by ID
export async function findUserById(uid) {
    const user = await User.findById(uid);
    return user;
};

// Get user by Firestore UID
export async function findFirestoreUser(firestoreUid) {
    const user = await User.findOne({ "uid": firestoreUid });
    return user;
}

// Get user's last emotion
export async function getUserEmotion(uid) {
    try {
        const user = await User.findById(uid);
        return user.userLastEmotion;
    } catch (error) {
        throw new Error(`Get user emotion error: ${error}`);
    }
};

// Get partner's last emotion
export async function getPartnerEmotion(uid) {
    try {
        const user = await User.findById(uid);
        return user.partnerLastEmotion;
    } catch (error) {
        throw new Error(`Get partner emotion error: ${error}`);
    }
};

// Get user's location data
export async function getUserLocationData(uid) {
    try {
        const user = await User.findById(uid);
        const locData = [];
        if (user.city && user.countryCode) {
            locData = [user.city, user.countryCode];
        } else {
            console.log("No location data yet");
        }
        return locData;

    } catch (error) {
        throw new Error(`Get user emotion error: ${error}`);
    }
};

// Get user's background image
export async function getUserBackground(uid) {
    try {
        const user = await User.findById(uid);
        const backgroundPhoto = '';
        if (user.backgroundPhoto) {
            backgroundPhoto = user.backgroundPhoto;
        } else {
            console.log("No background data yet");
        }
        return backgroundPhoto;

    } catch (error) {
        throw new Error(`Get user emotion error: ${error}`);
    }
};
