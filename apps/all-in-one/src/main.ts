import { NestFactory } from '@nestjs/core';
import { AllInOneModule } from './all-in-one.module';
import { getConfig } from 'apps/utils';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const { ALL_IN_ONE } = getConfig();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AllInOneModule,
    {
      transport: Transport.TCP,
      options: {
        port: ALL_IN_ONE.port,
      },
    },
  );
  await app.listen();
  console.log('All in one microservice is listening');
}
bootstrap();
