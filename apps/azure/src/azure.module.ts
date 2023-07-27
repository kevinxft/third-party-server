import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { HttpModule } from '@nestjs/axios';
import { DictionaryModule } from 'apps/dictionary/src/dictionary.module';
import { getConfig } from '../../utils';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OpenaiModule } from './openai/openai.module';
const { DICTIONARY } = getConfig();

const { HTTP_CONFIG } = getConfig();

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CONFIG.timeout,
      maxRedirects: HTTP_CONFIG.maxRedirects,
    }),
    ClientsModule.register([
      {
        name: DICTIONARY.name,
        transport: Transport.TCP,
        options: {
          port: DICTIONARY.port,
        },
      },
    ]),
    DictionaryModule,
    OpenaiModule,
  ],
  controllers: [AzureController],
  providers: [AzureService],
})
export class AzureModule {}
