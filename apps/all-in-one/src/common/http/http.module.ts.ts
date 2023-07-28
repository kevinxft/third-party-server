import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { getConfig } from 'apps/utils';

const { HTTP_CONFIG } = getConfig();
const HttpService = HttpModule.register({
  timeout: HTTP_CONFIG.timeout,
  maxRedirects: HTTP_CONFIG.maxRedirects,
});

@Module({
  imports: [HttpService],
  exports: [HttpService],
})
export class HttpServiceModule {}
