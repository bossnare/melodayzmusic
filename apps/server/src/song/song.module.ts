import { Module } from '@nestjs/common';
import { SongService } from './song.service.js';
import { SongController } from './song.controller.js';

@Module({
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
