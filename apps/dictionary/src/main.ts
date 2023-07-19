import { NestFactory } from '@nestjs/core';
import { DictionaryModule } from './dictionary.module';
import { getConfig } from 'apps/utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const { DICTIONARY } = getConfig();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DictionaryModule,
    {
      transport: Transport.TCP,
      options: {
        port: DICTIONARY.port,
      },
    },
  );
  await app.listen();
  console.log('Dictionary microservice is listening');
}
bootstrap();
