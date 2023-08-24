import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;

  @BeforeUpdate()
  @BeforeInsert()
  updateTimestamp() {
    this.updatedAt = new Date().toISOString();
  }
}
