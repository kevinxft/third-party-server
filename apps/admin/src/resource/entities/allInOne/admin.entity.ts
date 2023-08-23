import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  Index,
  BeforeUpdate,
} from 'typeorm';
import { BcryptService } from '../../../common/bcrypt.service';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    if (this.password) {
      this.password = await BcryptService.hash(this.password);
    }
  }
}
