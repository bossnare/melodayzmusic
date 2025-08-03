import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set 📛');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.$connect();
      console.log('Connected to PostgreSQL via Prisma ✅');
    } catch (err) {
      console.error('Failed to connect to PostgreSQL ❌📛', err);
    }
  }

  async onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$disconnect();
    console.log('Disconnected from PostgreSQL ♾️');
  }
}
