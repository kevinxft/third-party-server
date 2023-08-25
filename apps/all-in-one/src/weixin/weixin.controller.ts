import { Controller } from '@nestjs/common';
import { WeixinService } from './weixin.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('weixin')
export class WeixinController {
  constructor(private readonly weixinService: WeixinService) {}

  @MessagePattern('wx-login')
  login(body) {
    return this.weixinService.login(body);
  }
}
