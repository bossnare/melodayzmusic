import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    // global env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  //afaka fafaina ireto ambany miaraka amin'ny fichier controller sy services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
