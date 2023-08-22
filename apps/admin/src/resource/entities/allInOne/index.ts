import { Lesson } from './lesson.entity';
import { Word } from './word.entity';
import { WeixinUser } from './weixinUser.entity';
import { WordBook } from './word-book.entity';
import { Dictionary } from './dictionary.entity';

const MAP = {
  lesson: Lesson,
  word: Word,
  weixinUser: WeixinUser,
  wordBook: WordBook,
  dictionary: Dictionary,
};

export { Lesson, Word, WeixinUser, WordBook, Dictionary, MAP };
