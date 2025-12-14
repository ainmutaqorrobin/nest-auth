import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @Column()
  createdAt: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hasPassword() {
    this.password = await hash(this.password, 10);
  }
}
