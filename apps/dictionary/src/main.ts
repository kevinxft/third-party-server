import { NestFactory } from '@nestjs/core';
import { DictionaryModule } from './dictionary.module';
import { getConfig } from 'apps/utils';

const { DICTIONARY } = getConfig();
async function bootstrap() {
  const app = await NestFactory.create(DictionaryModule);
  await app.listen(DICTIONARY.port);
}
bootstrap();
