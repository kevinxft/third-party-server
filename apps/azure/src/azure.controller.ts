import { Controller } from '@nestjs/common';
import { AzureService } from './azure.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  @MessagePattern('translate')
  async translate(text: string): Promise<any> {
    return this.azureService.translate(text);
  }

  @MessagePattern('dictionarize')
  dictionarize(word: string): Promise<any> {
    return this.azureService.dictionarize(word);
  }
}
