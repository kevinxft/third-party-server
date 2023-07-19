import { NestFactory } from '@nestjs/core';
import { TranslationModule } from './translation.module';
import { getConfig } from '@utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const { TRANSLATION } = getConfig();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TranslationModule,
    {
      transport: Transport.TCP,
      options: {
        port: TRANSLATION.port,
      },
    },
  );
  await app.listen();
}
bootstrap();
