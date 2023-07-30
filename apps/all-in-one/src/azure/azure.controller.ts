import { Controller } from '@nestjs/common';
import { AzureService } from './azure.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('azure')
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  @MessagePattern('translate')
  translate(text: string): Promise<any> {
    return this.azureService.translate(text);
  }

  @MessagePattern('dictionarize')
  dictionarize(word: string): Promise<any> {
    return this.azureService.dictionarize(word);
  }

  @MessagePattern('isAzureWord')
  isWord(word: string): Promise<boolean> {
    return this.azureService.isWord(word);
  }

  @MessagePattern('azure-makeSentence')
  makeSentence(words: string[]) {
    return this.azureService.makeSentence(words);
  }
}
