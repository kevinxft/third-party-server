import { Lesson } from './lesson.entity';
import { Word } from './word.entity';
import { User } from './user.entity';
import { UserWord } from './user-word.entity';
import { UserBook } from './user-book.entity';
import { WordBook } from './word-book.entity';
import { Dictionary } from './dictionary.entity';

const MAP = {
  lesson: Lesson,
  word: Word,
  user: User,
  'user-word': UserWord,
  'user-book': UserBook,
  'word-book': WordBook,
  dictionary: Dictionary,
};

export { Lesson, Word, User, UserWord, UserBook, WordBook, Dictionary, MAP };
