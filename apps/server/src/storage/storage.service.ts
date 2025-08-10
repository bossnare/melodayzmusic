import { FileInterface } from './../types/storage/file.interface.js';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('S3Client') private readonly s3Client: S3Client,
  ) {}

  async uploadFile(file: FileInterface) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get('B2_BUCKET_NAME')!,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimeType,
      });

      await this.s3Client.send(command);
      return `OK: ${file.originalname}`;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Failed to upload file: ${err.message}`);
      }
      console.log(err);
      throw new Error('Unknown error during file upload');
    }
  }
}
