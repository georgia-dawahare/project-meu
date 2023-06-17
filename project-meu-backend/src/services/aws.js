// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libs/s3Client.js";
import * as fs from 'fs';

const uploadPhoto = async () => {
    const imageUrl = "https://www.publicdomainpictures.net/pictures/160000/nahled/couple-damoureux.jpg";
    // const fileContent = fs.readFileSync(imageUrl);
    // const res = await fetch(imageUrl);
    // const blob = await res.buffer()
    const fileStream = fs.createReadStream(imageUrl);

    // Set the parameters
    const params = {
        Bucket: "meu-photo-bucket", // The name of the bucket. For example, 'sample-bucket-101'.
        Key: imageUrl, // The name of the object. For example, 'sample_upload.txt'.
        Body: fileStream, // The content of the object. For example, 'Hello world!".
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

const downloadPhoto = async () => {
    const command = new GetObjectCommand({
        Bucket: "meu-photo-bucket",
        Key: "sample_upload"
    });

    try {
        const response = await s3Client.send(command);
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        const str = await response.Body.transformToString();
        console.log(str);
    } catch (err) {
        console.error(err);
    }
}

uploadPhoto();

const awsService = {
    downloadPhoto,
    uploadPhoto
}

export default awsService;
