import { s3Client } from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (key: string, value: File) => {
    try {
        const uploadParams = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: key,
            Body: value,
            // ACL: "public-read" as const,
            region: process.env.NEXT_PUBLIC_AWS_S3_REGION
        };
        const command = new PutObjectCommand(uploadParams);
        const res = await s3Client.send(command);
        const s3ObjectUrl = `https://${ process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${ process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;
        return s3ObjectUrl;
    } catch (error) {
        console.log(error);
        throw new Error("Cannot upload file, please try again!");
    }
};