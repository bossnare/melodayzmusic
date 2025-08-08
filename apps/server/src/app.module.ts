import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SongModule } from './song/song.module.js';
import { UserModule } from './user/user.module.js';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // global env file
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, `.env`], // '.env' fallback
      // jwt_secret is required
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    PrismaModule,
    UserModule,
    SongModule,
    AuthModule,
  ],
  //afaka fafaina ireto ambany miaraka amin'ny fichier controller sy services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
