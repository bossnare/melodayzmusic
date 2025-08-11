import { S3Client } from '@aws-sdk/client-s3';
import { Provider } from '@nestjs/common';
import { getEnvVar } from '../utils/env.var.js';
const storeMode = getEnvVar('STORE_MODE');

export const s3Provider: Provider = {
  provide: 'S3Client', // ensure that token is even on StorageService
  useFactory: (): S3Client | null => {
    if (storeMode === 'local') {
      return null;
    } else {
      return new S3Client({
        region: 'us-east-005',
        endpoint: process.env.B2_ENDPOINT!,
        credentials: {
          accessKeyId: process.env.B2_KEY_ID!,
          secretAccessKey: process.env.B2_APP_KEY!,
        },
        forcePathStyle: true,
        maxAttempts: 3,
        requestHandler: {
          requestTimeout: 30000,
          connectionTimeout: 10000,
        },
      });
    }
  },
};
