import { Module } from '@nestjs/common';
import { WeixinService } from './weixin.service';
import { WeixinController } from './weixin.controller';
import { HttpServiceModule } from '../common/http/http.module.ts';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [HttpServiceModule, DatabaseModule],
  controllers: [WeixinController],
  providers: [WeixinService],
})
export class WeixinModule {}
