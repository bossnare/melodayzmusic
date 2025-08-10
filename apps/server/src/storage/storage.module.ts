import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { ConfigModule } from '@nestjs/config';
import { s3Provider } from './s3.provider.js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [StorageService, s3Provider],
  exports: [StorageService],
})
export class StorageModule {}
