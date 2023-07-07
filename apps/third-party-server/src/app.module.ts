import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getConfig } from '../../utils';
const { OPENAI, TRANSLATION } = getConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: OPENAI.name,
        transport: Transport.TCP,
        options: {
          port: OPENAI.port,
        },
      },
      {
        name: TRANSLATION.name,
        transport: Transport.TCP,
        options: {
          port: TRANSLATION.port,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
