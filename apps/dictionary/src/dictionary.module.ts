import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { DatabaseModule } from './database.module';
import { DictionaryGateway } from './dictionary.gateway';

@Module({
  imports: [DatabaseModule, DictionaryGateway],
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryGateway],
})
export class DictionaryModule {}
