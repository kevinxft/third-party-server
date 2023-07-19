import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Dictionary, Word } from './entities';
import { getValuesFormJson, formatResponse } from './entities/word.entity';
import { get } from 'lodash';

@Injectable()
export class DictionaryService {
  constructor(@Inject('MYSQL_SOURCE') private dataSource: DataSource) {}
  async getDictList() {
    const dicts = await this.dataSource.getRepository(Dictionary).find({});
    return {
      data: dicts,
      count: dicts.length,
    };
  }

  async search(name: string, bookId?: string): Promise<any> {
    const where: { name: string; bookId?: string } = { name: name.trim() };
    if (bookId) {
      where.bookId = bookId;
    }
    const arr = await this.dataSource.getRepository(Word).find({
      where,
    });
    return {
      count: arr.length,
      data: formatResponse(arr),
    };
  }

  async addDictionary({ name, bookId, count }) {
    const dictionary = await this.dataSource.manager.findOneBy(Dictionary, {
      name,
    });
    if (dictionary) {
      return dictionary;
    }
    const newDictionary = Object.assign(new Dictionary(), {
      name,
      count,
      bookId,
    });
    return await this.dataSource.manager.save(newDictionary);
  }

  async addOneWordToDict({ word, dict }: { word: any[]; dict: any }) {
    const newWord = Object.assign(new Word(), getValuesFormJson(word));
    newWord.dictionary = dict;
    try {
      await this.dataSource.manager.save(newWord);
      return `${newWord.name} 录入成功!`;
    } catch (error) {
      return `单词 ${newWord.name} 已经存在!`;
    }
  }

  async addWordToDict(words: any[], dictionary: any) {
    for (const word of words) {
      const newWord = Object.assign(new Word(), getValuesFormJson(word));
      newWord.dictionary = dictionary;
      try {
        console.log(`录入单词 ${newWord.name}...`);
        await this.dataSource.manager.save(newWord);
      } catch (error) {
        console.log(`${newWord.name}...`);
      }
    }
    return {
      message: '完成录入',
    };
  }

  async addDictionaryAndWords(name: string, words: any[] = []) {
    const bookId = get(words, '0.bookId');
    let dictionary = await this.dataSource.manager.findOneBy(Dictionary, {
      name,
    });
    if (!dictionary) {
      dictionary = Object.assign(new Dictionary(), {
        name,
        count: words.length,
        bookId,
      });
      await this.dataSource.manager.save(dictionary);
    }
    for (const word of words) {
      const newWord = Object.assign(new Word(), getValuesFormJson(word));
      newWord.dictionary = dictionary;
      try {
        console.log(`录入 ${newWord.name}...`);
        await this.dataSource.manager.save(newWord);
      } catch (error) {
        console.log('跳过重复');
      }
    }
    return {
      message: '完成录入',
    };
  }

  async isHasDict(name: string): Promise<boolean> {
    const dict = await this.dataSource.manager.findOneBy(Dictionary, {
      name,
    });
    return !!dict;
  }
}
