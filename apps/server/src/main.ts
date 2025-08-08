import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
// import { Console } from 'console';
import { Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';
import swaggerConfig from './configs/swagger.config.js';
import { port, production } from './constants/env.constant.js';
import { landingPage } from './landing.page.js';

const logger = new Logger('Bootstrap');

// App server config
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // public dir config, make public readable
  // const __filename = fileURLToPath(import.meta.url); //
  // const __dirname = dirname(__filename);
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  // jwt guards
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Helmet middleware for security headers
  app.use(helmet());
  // Morgan middleware for logging HTTP requests
  app.use(morgan('dev'));
  // Set global API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation setup
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS with credentials
  app.enableCors({
    // tsy atao "*" raha miaraka amin'ny credentials, atao mazava ilay origin
    origin: ['*'],
    // credentials: true,
  });

  // Express friendly - use getHttpAdapter() - simple landing page - motivation only 😎
  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.send(landingPage);
  });

  // listen a port
  await app.listen(port, '0.0.0.0');
  logger.log(
    production
      ? '🚀 Application is running on: https://melodayzmusic-api.onrender.com ❇️.'
      : `🚀 Application is running on: http://localhost:${port}`,
  );
  console.log('✔ MODE:', process.env.NODE_ENV, '🪄  ✅');
}

// catch this error, and kill process
bootstrap().catch((err: unknown) => {
  logger.error('❌ Failed to start application:', err);
  process.exit(1);
});
