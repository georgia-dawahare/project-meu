import ResponseGroup from '../models/ResponseGroupModel';

// Create response group
export async function createResponseGroup(questionId,pairId) {
    const responseGroup = new ResponseGroup();
    responseGroup.questionId = questionId;
    responseGroup.pairId = pairId;
    console.log(responseGroup);
    try {
        // await save to db
        const savedResponseGroup = await responseGroup.save();
        console.log('group_data');
        console.log(savedResponseGroup);
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
     
      const responseGroup = await ResponseGroup.find({pairId})
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
