import { S3Client } from '@aws-sdk/client-s3';

export const s3Provider = {
  provide: 'S3Client', // ensure that token is even on StorageService
  useFactory: (): S3Client => {
    return new S3Client({
      region: 'us-east-005',
      endpoint: process.env.B2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.B2_KEY_ID!,
        secretAccessKey: process.env.B2_APP_KEY!,
      },
      forcePathStyle: true,
    });
  },
};
