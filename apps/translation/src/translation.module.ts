import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { HttpModule } from '@nestjs/axios';
import { getConfig } from '@utils';

const { HTTP_CONFIG } = getConfig();

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CONFIG.timeout,
      maxRedirects: HTTP_CONFIG.maxRedirects,
    }),
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
