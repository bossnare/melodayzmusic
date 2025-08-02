import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('MeloDayz API')
  .setDescription('The MeloDayz REST API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export default swaggerConfig;
