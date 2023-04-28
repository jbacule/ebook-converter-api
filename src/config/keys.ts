import dotenv from "dotenv";
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  httpPort: process.env.HTTP_PORT,
  calibreLibPath: process.env.CALIBRE_LIB_PATH,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  s3BaseStorageUrl: process.env.S3_BASE_STORAGE_URL,
};
