import { UserBook } from './user-book.entity';
import { UserWord } from './user-word.entity';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

const MAP = {
  userBook: UserBook,
  userWord: UserWord,
  user: User,
  lesson: Lesson,
};

export { User, UserBook, UserWord, Lesson, MAP };
