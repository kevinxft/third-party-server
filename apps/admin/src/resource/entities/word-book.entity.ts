import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './word.entity';

@Entity()
export class WordBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char' })
  name: string;

  @ManyToMany(() => Word)
  @JoinTable()
  words: Word[];
}
