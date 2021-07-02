import { User } from './../users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // createdBy... point to user
  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;
}
