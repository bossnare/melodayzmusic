import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // global env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, `.env`], // '.env' fallback
    }),
    PrismaModule,
  ],
  //afaka fafaina ireto ambany miaraka amin'ny fichier controller sy services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
