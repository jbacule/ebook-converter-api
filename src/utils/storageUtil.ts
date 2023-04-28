import { keys } from "@/config";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const REGION = "ap-southeast-1";
const BUCKET_NAME = "jjandjbucket";
const ACL = "public-read-write";

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretKey,
  },
});

export const uploadObject = async (key, body) => {
  const command = new PutObjectCommand({
    ACL: ACL,
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
  });
  const response = await client.send(command);
  return response;
};

export const getObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  const s3Response = await client.send(command);
  return s3Response.Body;
};
