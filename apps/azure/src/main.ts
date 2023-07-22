import { NestFactory } from '@nestjs/core';
import { AzureModule } from './azure.module';
import { getConfig } from '@utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const { AZURE } = getConfig();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AzureModule,
    {
      transport: Transport.TCP,
      options: {
        port: AZURE.port,
      },
    },
  );
  await app.listen();
  console.log('Azure microservice is listening');
}
bootstrap();
