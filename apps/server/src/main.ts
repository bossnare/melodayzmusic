import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';
import swaggerConfig from './configs/swagger.config.js';
import { production } from './constants/env.constant.js';
import { landingPage } from './landing.page.js';
import { getEnvVar } from './utils/env.var.js';

const logger = new Logger('Bootstrap');

// App server config
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const storeMode = getEnvVar('STORE_MODE');
  const port = getEnvVar('PORT', '5000');

  // public dir config, make public readable
  // const __filename = fileURLToPath(import.meta.url); //
  // const __dirname = dirname(__filename);
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  // jwt guards
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // ValidationPipe for DTO and class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Manala champs tsy ao @ DTO
      forbidNonWhitelisted: true, // manome error raha tsy mifanaraka validation
      transform: true, // avadika ho type mety instaed
    }),
  );

  app.use(helmet()); // Helmet middleware for security headers
  app.use(morgan('dev')); // Morgan middleware for logging HTTP requests
  app.setGlobalPrefix('api/v1'); // Set global API prefix

  // Swagger documentation setup
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS with credentials
  app.enableCors({
    // tsy atao "*" raha miaraka amin'ny credentials, atao mazava ilay origin
    origin: ['https://melodayzmusic.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });

  // Express friendly - use getHttpAdapter() - simple landing page - motivation only 😎
  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.send(landingPage);
  });

  // uptime - just sample Robot
  app.getHttpAdapter().get('/health', (_, res: Response) => {
    res.json({ status: 'uptime ok' }).status(200);
  });

  // listen a port
  await app.listen(port, '0.0.0.0');
  logger.log(
    production
      ? '🚀 Application is running on: https://melodayzmusic-api.onrender.com ❇️.'
      : `🚀 Application is running on: http://localhost:${port}`,
  );
  console.log(
    '✔ MODE:',
    process.env.NODE_ENV,
    '🪄  ✅',
    ` - Storage: ${storeMode} 🚀`,
  );
}

// catch this error, and kill process
bootstrap().catch((err: unknown) => {
  logger.error('❌ Failed to start application:', err);
  process.exit(1);
});
