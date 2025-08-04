import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      // Ensure env var don't exists..
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set 📛');
      }
      await this.$connect();
      console.log('Connected to PostgreSQL via Prisma ✅');
    } catch (err) {
      console.error('Failed to connect to PostgreSQL ❌📛', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected from PostgreSQL ♾️');
  }
}
