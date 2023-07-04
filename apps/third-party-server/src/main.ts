import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from '../../utils';

const { THIRD_PARTY_SERVER } = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(THIRD_PARTY_SERVER.port);
}
bootstrap();
