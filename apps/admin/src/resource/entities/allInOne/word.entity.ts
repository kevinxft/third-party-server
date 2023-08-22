import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['name', 'dictId'], { unique: true })
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dictId: string;

  @Column({ nullable: true })
  ukphone: string;

  @Column({ nullable: true })
  usphone: string;

  @Column({ nullable: true })
  ukspeech: string;

  @Column({ nullable: true })
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
