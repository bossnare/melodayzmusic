import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
// import { Console } from 'console';
import { Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
import { AppModule } from './app.module.js';
import swaggerConfig from './configs/swagger.config.js';

// App server config
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // port in env file and fallback
  const port = process.env.PORT ?? 5000;

  // public dir config, make public readable
  // const __filename = fileURLToPath(import.meta.url); //
  // const __dirname = dirname(__filename);
  // app.useStaticAssets(join(__dirname, '..', 'public'));

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

  // Express friendly - use getHttpAdapter() - landing page simple - motivation only 😎
  app.getHttpAdapter().get('/', (_, res: Response) => {
    res
      .json({
        message: 'Hello, welcome to MelodayzMusic API.',
        tag: 'Feel the beat, anywhere you go!!!',
      })
      .status(200);
  });

  // listen a port
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  // console.log('database:', process.env.MONGO_URI);
}

// catch this error, look like very clear
bootstrap().catch((err: unknown) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
