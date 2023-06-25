import Response from '../models/ResponseModel';
import * as Pairs from '../controllers/PairController';
import * as ResponseGroups from '../controllers/ResponseGroupController';

// Create response group
export async function createResponse(userId, responseGroupId, responseContent) {
    const response = new Response();
    response.response = responseContent;
    response.userId = userId;

    try {
        // await save to db
        const savedResponse = await response.save();

        // add response ID to response group
        const pairId = await Pairs.findPairByUserId(userId);
        const primaryUserId = await Pairs.findPrimaryUser(pairId);
        const secondaryUserId = await Pairs.findSecondaryUser(pairId);

        // check if user is primary user or secondary user 
        if (userId === primaryUserId.toString()) {
            await ResponseGroups.updateResponseGroup(responseGroupId, { responseId1: savedResponse._id });
        } else if (userId === secondaryUserId.toString()) {
            await ResponseGroups.updateResponseGroup(responseGroupId, { responseId2: savedResponse._id });
        }
        return savedResponse;
    } catch (error) {
        throw new Error(`create response error: ${error}`);
    }
};

// Update response group
export async function updateResponse(responseId, updatedFields) {
    try {
        // await updating response by ID
        const updatedResponse = await Response.findOneAndUpdate({ _id: responseId }, updatedFields, { returnOriginal: false });
        return updatedResponse; // return *updated* response
    } catch (error) {
        throw new Error(`update response error: ${error}`);
    }
};

// Delete response
export async function deleteResponse(responseId) {
    try {
        // await find a response by id and delete
        await Response.findByIdAndDelete(responseId);
        const success = `Successfully deleted response with ID: ${responseId}`;
        return success; // return confirmation
    } catch (error) {
        throw new Error(`delete response error: ${error}`);
    }
}

// Fetch response group
export async function findResponseById(responseId) {
    try {
        const response = await Response.findById(responseId);
        return response;
    } catch (error) {
        throw new Error(`find response by ID error: ${error}`);
    }
};
