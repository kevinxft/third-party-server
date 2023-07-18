import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Dictionary } from './dictionary.entity';
import { get } from 'lodash';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.words)
  dictionary: Dictionary;

  @Column()
  name: string;

  @Column({ nullable: true })
  originBookId: string;

  @Column()
  ukphone: string;

  @Column()
  usphone: string;

  @Column()
  ukspeech: string;

  @Column()
  usspeech: string;

  @Column({ nullable: true, type: 'text' })
  sentences: string;

  @Column({ nullable: true, type: 'text' })
  synos: string;

  @Column({ nullable: true, type: 'text' })
  trans: string;

  @Column({ nullable: true, type: 'text' })
  rels: string;

  @Column({ nullable: true, type: 'text' })
  phrases: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

const propMaps = [
  ['name', 'headWord'],
  ['originBookId', 'bookId'],
  ['usphone', 'content.word.content.usphone'],
  ['ukphone', 'content.word.content.ukphone'],
  ['usspeech', 'content.word.content.usspeech'],
  ['ukspeech', 'content.word.content.ukspeech'],
  ['sentences', 'content.word.content.sentence.sentences'], // JSON
  ['synos', 'content.word.content.syno.synos'], // 多个翻译 JSON
  ['trans', 'content.word.content.trans'], // 单个翻译
  ['phrases', 'content.word.content.phrase.phrases'], // JSON
  ['rels', 'content.word.content.relWord.rels'], // JSON
];

export const needFormatKeys = {
  sentences: true,
  synos: true,
  trans: true,
  phrases: true,
  rels: true,
};

export const getValuesFormJson = (data: unknown) => {
  return propMaps.reduce((res, prop) => {
    const value = get(data, prop[1]);
    res[prop[0]] = needFormatKeys[prop[0]] ? JSON.stringify(value) : value;
    return res;
  }, {});
};

export const formatResponse = (arr) => {
  return arr.map((word) => {
    const obj = {};
    Object.keys(word).forEach((key) => {
      const value = word[key];
      if (needFormatKeys[key] && value) {
        obj[key] = JSON.parse(value);
      } else {
        obj[key] = value;
      }
    });
    return obj;
  });
};
