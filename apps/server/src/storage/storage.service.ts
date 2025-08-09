import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class StorageService {
  constructor(
    private configService: ConfigService,
    private s3: S3,
  ) {
    this.s3 = new S3({
      endpoint: 'https://s3.us-east-005.backblazeb2.com',
      accessKeyId: this.configService.get('B2_KEY_ID'),
      secretAccessKey: this.configService.get('B2_APP_KEY'),
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  async uploadFile(buffer: Buffer, key: string) {
    await this.s3
      .upload({
        Bucket: this.configService.get('B2_BUCKET_NAME')!,
        Key: key,
        Body: buffer,
      })
      .promise();
  }
}
