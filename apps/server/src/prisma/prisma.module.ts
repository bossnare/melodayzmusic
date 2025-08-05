import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // Available amin'ny module rehetra ilay module "PrismaModule" ity
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // atao export: mba ho azo import manerana app
})
export class PrismaModule {}
