// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libs/s3Client.js";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import * as fs from 'fs';

// TODO: put all credentials in env file
const imagePath = "file:///Users/georgiadawahare/Library/Developer/CoreSimulator/Devices/DB86EC31-E723-475D-92A5-6501D27A1506/data/Containers/Data/Application/094A2203-837B-4B67-B302-016D8915A81F/Library/Caches/ExponentExperienceData/%2540projectmeu%252Fproject-meu/ImagePicker/42AF784E-07C5-48B1-AAD3-ED4CD7DC1B15.jpg"

const uploadImage = async (userId, imageUrl) => {
    const fileName = `${userId}_${Date.now()}_${imageUrl}`;

    // Set the parameters
    const params = {
        Bucket: "meu-photo-bucket", // The name of the bucket. For example, 'sample-bucket-101'.
        Key: fileName, // The name of the object. For example, 'sample_upload.txt'.
        Body: imageUrl, // The content of the object. For example, 'Hello world!".
        ContentType: 'application/octet-stream'
    };


    // Create an object and upload it to the Amazon S3 bucket.
    try {
        const results = await s3Client.send(new PutObjectCommand(params));

        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );

        return fileName; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

const downloadImage = async (fileName) => {
    const command = new GetObjectCommand({
        Bucket: "meu-photo-bucket",
        Key: fileName
    });


    const signedUrl = await getSignedUrl(s3Client, command);
    console.log(signedUrl);
    return signedUrl;
}

const newFile = uploadImage("1", imagePath);
downloadImage(newFile);

const awsService = {
    downloadImage,
    uploadImage
}

export default awsService;
