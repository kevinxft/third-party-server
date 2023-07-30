import { Module } from '@nestjs/common';
import { AllInOneController } from './all-in-one.controller';
import { AllInOneService } from './all-in-one.service';
import { AzureModule } from './azure/azure.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DictionaryService } from './dictionary/dictionary.service';
import { DatabaseModule } from './database.module';
import { WeixinModule } from './weixin/weixin.module';

@Module({
  imports: [AzureModule, DictionaryModule, DatabaseModule, WeixinModule],
  controllers: [AllInOneController],
  providers: [AllInOneService, DictionaryService],
})
export class AllInOneModule {}
