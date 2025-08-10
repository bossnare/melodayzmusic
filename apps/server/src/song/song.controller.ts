import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators/public.decorator.js';
import { StorageService } from './../storage/storage.service.js';
import { CreateSongDto } from './dto/create-song.dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';
import { SongService } from './song.service.js';

@Controller('song')
export class SongController {
  constructor(
    private readonly songService: SongService,
    private readonly storageService: StorageService,
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSong(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    await this.storageService.uploadFile(file);
    return {
      message: file.originalname,
    };
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}
