import { Module } from '@nestjs/common';
import { SongController } from './song.controller.js';
import { SongService } from './song.service.js';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({})],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
