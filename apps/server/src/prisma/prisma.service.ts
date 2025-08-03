import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to PostgreSQL via Prisma');
    } catch (err) {
      console.error('Failed to connect to PostgreSQL', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected from PostgreSQL');
  }
}
