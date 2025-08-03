import { PrismaClient } from 'generated/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
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
