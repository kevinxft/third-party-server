import { Controller } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @MessagePattern('translate')
  async translate(text: string): Promise<any> {
    return this.translationService.translate(text);
  }

  @MessagePattern('dictionarize')
  dictionarize(word: string): Promise<any> {
    return this.translationService.dictionarize(word);
  }
}
