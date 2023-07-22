import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getConfig } from '../../utils';
import { EventsModule } from './events.module';
const { OPENAI, AZURE, DICTIONARY } = getConfig();

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
        name: AZURE.name,
        transport: Transport.TCP,
        options: {
          port: AZURE.port,
        },
      },
      {
        name: DICTIONARY.name,
        transport: Transport.TCP,
        options: {
          port: DICTIONARY.port,
        },
      },
    ]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
