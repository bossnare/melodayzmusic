import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getEnvVar } from '../../utils/env.var.js';
@Injectable()
export class StorageService {
  private readonly storeMode = getEnvVar('STORE_MODE');
  private readonly logger = new Logger('Testing');

  constructor(
    private readonly configService: ConfigService,
    @Inject('S3Client') private readonly s3Client: S3Client,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    // separate: local and  cloud store
    if (this.storeMode === 'local') {
      this.logger.log('Testing ... MODE: LOCAL');
    } else {
      try {
        const command = new PutObjectCommand({
          Bucket: this.configService.get<string>('B2_BUCKET_NAME')!,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        });

        await this.s3Client.send(command);
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(`Failed to upload file: ${err.message}`);
        }
        console.log(err);
        throw new Error('Unknown error during file upload');
      }
    }
  }

  async testConnection() {
    try {
      this.logger.log('Testing B2 connection ...');
      const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
      const command = new ListObjectsV2Command({
        Bucket: this.configService.get<string>('B2_BUCKET_NAME')!,
        MaxKeys: 1,
      });

      await this.s3Client.send(command);
      this.logger.log('B2 connection test successful');
      return true;
    } catch (error) {
      this.logger.error('B2 connection test failed:', error);
      return false;
    }
  }
}
