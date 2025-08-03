import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // atao export: mba ho azo @ module rehetra alaina
})
export class PrismaModule {}
