import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TranslateBodyDto } from '../../common/dto/translateBody.dto';

@Controller()
export class AppController {
  constructor(@Inject('TRANSLATION') private translationService: ClientProxy) {}

  @Post('translate')
  translate(@Body() body: TranslateBodyDto): Promise<string> {
    console.log('main', body);
    const res = this.translationService.send<string>('translate', body);
    return lastValueFrom(res);
  }
}
