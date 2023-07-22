import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
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
  controllers: [AzureController],
  providers: [AzureService],
})
export class AzureModule {}
