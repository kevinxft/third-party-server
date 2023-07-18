import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Dictionary, Word } from './entities';
import { getValuesFormJson, formatResponse } from './entities/word.entity';

@Injectable()
export class DictionaryService {
  constructor(@Inject('MYSQL_SOURCE') private dataSource: DataSource) {}
  async getHello() {
    const arr = await this.dataSource.getRepository(Word).find({});
    return { data: formatResponse(arr) };
  }

  async addDictionaryAndWords(name: string, words: any[] = []) {
    const dictionary = Object.assign(new Dictionary(), {
      name,
      count: words.length,
    });
    await this.dataSource.manager.save(dictionary);
    for (const word of words.slice(0, 4)) {
      const newWord = Object.assign(new Word(), getValuesFormJson(word));
      console.log(newWord);
      newWord.dictionary = dictionary;
      console.log(`录入 ${newWord.name}...`);
      await this.dataSource.manager.save(newWord);
    }
  }
}
