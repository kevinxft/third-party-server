import { Controller } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslateBodyDto } from '../../common/dto/translateBody.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @MessagePattern('translate')
  async translate(body: TranslateBodyDto): Promise<any> {
    return this.translationService.translate(body.text);
  }

  @MessagePattern('dictionarize')
  dictionarize(body: TranslateBodyDto): Promise<any> {
    return this.translationService.dictionarize(body.text);
  }
}
