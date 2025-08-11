import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from './../storage/storage.service.js';
import { CreateSongDto } from './dto/create-song.dto.js';
import { UpdateSongDto } from './dto/update-song.dto.js';

@Injectable()
export class SongService {
  constructor(private readonly storageService: StorageService) {}
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  async uploadSong(file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('Insert a file please.');
    }
    console.log(file);
    await this.storageService.uploadFile(file);
    return {
      message: file.originalname,
    };
  }

  findAll() {
    return `This action returns all song`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
