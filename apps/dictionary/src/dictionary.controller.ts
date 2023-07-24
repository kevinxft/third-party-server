import { Controller } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { clearFrench } from './utils';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @MessagePattern('addDict')
  addDict(body) {
    return this.dictionaryService.addDictionary(body);
  }

  @MessagePattern('addWords')
  addWords(body) {
    return this.dictionaryService.addWordToDict(body.words, body.dict);
  }

  @MessagePattern('addOneWord')
  addOneWord(body: { word: any[]; dict: any }) {
    return this.dictionaryService.addOneWordToDict(body);
  }

  @MessagePattern('search')
  seacrch(body) {
    return this.dictionaryService.search(body.name, body.bookId);
  }

  @MessagePattern('isDictWord')
  isDictWord(word: string) {
    return this.dictionaryService.isWord(word);
  }

  @MessagePattern('list')
  getDictionaryList() {
    return this.dictionaryService.getDictList();
  }

  @MessagePattern('toArray')
  toArray(str) {
    return JSON.parse(clearFrench(str));
  }

  @MessagePattern('saveFromAPI')
  saveWordFromAPI(word) {
    return this.dictionaryService.saveWordFromAPI(word);
  }
}
