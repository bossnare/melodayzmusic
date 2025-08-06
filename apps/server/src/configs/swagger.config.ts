import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('MelodayzMusic API')
  .setDescription('The MelodayzMusic REST API documentation')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export default swaggerConfig;
