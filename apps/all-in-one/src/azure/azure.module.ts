import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { DatabaseModule } from '../database.module';
import { DictionaryService } from '../dictionary/dictionary.service';
import { HttpServiceModule } from '../common/http/http.module.ts';

@Module({
  imports: [HttpServiceModule, DatabaseModule],
  controllers: [AzureController],
  providers: [AzureService, DictionaryService],
})
export class AzureModule {}
