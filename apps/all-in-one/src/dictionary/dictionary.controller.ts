import { Controller } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { clearFrench } from './utils';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @MessagePattern('dict-add')
  addDict(body) {
    return this.dictionaryService.addDictionary(body);
  }

  @MessagePattern('dict-update')
  updateDict(body) {
    return this.dictionaryService.updateDictionary(body);
  }

  @MessagePattern('dict-refreshCount')
  refreshCount(dictId: string) {
    return this.dictionaryService.refreshCount(dictId);
  }

  @MessagePattern('dict-findByDictId')
  findDict(bookId: string) {
    return this.dictionaryService.findDictionary(bookId);
  }

  @MessagePattern('addWords')
  addWords(body) {
    return this.dictionaryService.addWordToDict(body.words, body.dict);
  }

  @MessagePattern('dict-addOneWord')
  addOneWord(body: { word: any[]; dictId: string }) {
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

  @MessagePattern('dict-list')
  getDictionaryList() {
    return this.dictionaryService.getDictList();
  }

  @MessagePattern('dict-StrToArray')
  toArray(str) {
    return JSON.parse(clearFrench(str));
  }

  @MessagePattern('dict-getRandomWords')
  getRandomWords(limit = 10) {
    return this.dictionaryService.getRandomWords(limit);
  }

  saveWordFromAPI(word) {
    return this.dictionaryService.saveWordFromAPI(word);
  }
}
