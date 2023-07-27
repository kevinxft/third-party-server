import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { HttpModule } from '@nestjs/axios';
import { getConfig } from '../utils';
import { DatabaseModule } from '../database.module';
import { DictionaryService } from '../dictionary/dictionary.service';

const { HTTP_CONFIG } = getConfig();

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CONFIG.timeout,
      maxRedirects: HTTP_CONFIG.maxRedirects,
    }),
    DatabaseModule,
  ],
  controllers: [AzureController],
  providers: [AzureService, DictionaryService],
})
export class AzureModule {}
