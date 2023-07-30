import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from '../../utils';

const { ADMIN } = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(ADMIN.port);
  console.log('Admin is listening at ' + ADMIN.port);
}
bootstrap();
