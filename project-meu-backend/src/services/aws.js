// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libs/s3Client.js";
import * as fs from 'fs';

const uploadImage = async (imageUrl) => {
    // const fileContent = fs.readFileSync(imageUrl);
    // const res = await fetch(imageUrl);
    // const blob = await res.buffer()

    // const fileStream = fs.createReadStream(imageUrl);
    const testContent = 'test'

    // Set the parameters
    const params = {
        Bucket: "meu-photo-bucket", // The name of the bucket. For example, 'sample-bucket-101'.
        Key: imageUrl, // The name of the object. For example, 'sample_upload.txt'.
        Body: testContent, // The content of the object. For example, 'Hello world!".
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
        return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

const downloadImage = async (imageUrl) => {
    const command = new GetObjectCommand({
        Bucket: "meu-photo-bucket",
        Key: imageUrl
    });

    try {
        const response = await s3Client.send(command);
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        // const webStream = response.Body.transformToWebStream();
        const str = await response.Body.transformToString();
        console.log(str);
        // console.log(webStream);
    } catch (err) {
        console.error(err);
    }
}

// uploadImage("test.txt");
downloadImage("test.txt");

const awsService = {
    downloadImage,
    uploadImage
}

export default awsService;
