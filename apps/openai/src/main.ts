import { NestFactory } from '@nestjs/core';
import { OpenaiModule } from './openai.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { getConfig } from '../../utils';

const { OPENAI } = getConfig();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OpenaiModule,
    {
      transport: Transport.TCP,
      options: {
        port: OPENAI.port,
      },
    },
  );
  await app.listen();
}
bootstrap();
