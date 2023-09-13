import ResponseGroup from '../models/ResponseGroupModel';

// Create response group
export async function createResponseGroup(questionId, pairId) {
    const responseGroup = new ResponseGroup();
    responseGroup.questionId = questionId;
    responseGroup.pairId = pairId;

    try {
        // await save to db
        const savedResponseGroup = await responseGroup.save();
        return savedResponseGroup;
    } catch (error) {
        throw new Error(`create response group error: ${error}`);
    }
}

// Get response group
export async function findResponseGroupById(responseGroupId) {
    try {
        const responseGroup = await ResponseGroup.findById(responseGroupId);
        return responseGroup;
    } catch (error) {
        throw new Error(`get response group error: ${error}`);
    }
}

// Get response group by pair Id
export async function findResponseGroupByPairId(pairId) {
    try {
        // const pId = mongoose.Types.ObjectId(pairId);

        const responseGroup = await ResponseGroup.find({ pairId })
        //   console.log(responseGroup);
        return responseGroup;
    } catch (error) {
        throw new Error(`get response group error: ${error}`);
    }
}

// Update response group
export async function updateResponseGroup(responseGroupId, updatedFields) {
    try {
        const updatedResponseGroup = await ResponseGroup.findOneAndUpdate({ _id: responseGroupId }, updatedFields, { returnOriginal: false });
        return updatedResponseGroup;
    } catch (error) {
        throw new Error(`update response group error: ${error}`);
    }
}

// Try to create a new response group each day unless a daily response group already exists
// Return new response group or existing group
export async function createDailyResponseGroup(pairId) {
    try {
        // Find most recently created response group for given pair ID
        const responseGroupRes = await ResponseGroup.find({ pairId }).sort({ createdAt: -1 }).limit(1);
        const mostRecentResponseGroup = responseGroupRes[0]

        // If previous response groups exist, create new response group or return today's response group
        if (mostRecentResponseGroup) {
            const mostRecentDate = mostRecentResponseGroup.createdAt;
            const currentDate = new Date();
            // If a response group for this pair exists for today, return existing response group 
            if (mostRecentDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
                return mostRecentResponseGroup;
            }
            // Else, create a new response group, using the next question ID  
            else {
                const newQuestionId = mostRecentResponseGroup.questionId + 1;
                return createResponseGroup(newQuestionId, pairId);
            }
        }

        // Create first response group if none exist yet
        return createResponseGroup(1, pairId);

    } catch (error) {
        throw new Error(`Create daily response group failed: ${error}`);
    }
}
