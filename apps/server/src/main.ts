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
  // app.getHttpAdapter().get('/', (_, res: Response) => {
  //   res
  //     .json({
  //       message: 'Hello, welcome to MelodayzMusic API.',
  //       tag: 'Feel the beat, anywhere you go!!!',
  //     })
  //     .status(200);
  // });

  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>MelodayzMusic</title>
        </head>
        <body style="padding: 0; margin: 0; background: rgb(3, 3, 12); 
          font-family: 'Inter', sans-serif; display: flex; 
          justify-content: center;">
          <div
            style="
              margin-top: 50px;
              width: 50%;
              display: flex;
              flex-direction: column;
              align-items: start;
              color: white;
            "
          >
            <h1 style="text-align: center">Welcome to MelodayzMusic API</h1>
            <p>
              <span style="color: #00BFFF">MelodayzMusic</span>
              is a web application designed to provide an engaging and
              seamless music experience for users.
            </p>
            <h3 style="padding: 0; margin: 2px">Features:</h3>
            <p style="margin: 0">
            <ol style="color: rgb(224, 224, 224)">
              <li>Stream and discover music.</li>
              <li>Create and manage playlists.</li>
              <li>User-friendly interface.</li>
              <li>Responsive design for all devices.</li>
              <li>Challenge mode for music enthusiasts.</li>
              <li>API independent backend for flexibility.</li>
              <li>Built with modern technologies like Bun, React, and
              Node.js.</li>
              <li>Supports both frontend and backend development.</li>
              <li>Uses Bun for dependency management.</li>
            </ol>
            </p>
            <button
              style="all: unset; background: #00BFFF; font-weight: 700; 
              padding: 10px 15px; border-radius: 2.5px; cursor: pointer;"
            >
              <a style="all: unset" target="_blank" href="http://localhost:${port}/api/docs">API Docs</a>
            </button>
          </div>
        </body>
      </html>
      `);
  });

  // listen a port
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log('Database is connected: ON 🫂');
  // console.log('database:', process.env.MONGO_URI);
}

// catch this error, look like very clear
bootstrap().catch((err: unknown) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
