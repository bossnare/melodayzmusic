import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // atao export: mba ho azo import manerana app
})
export class PrismaModule {}
