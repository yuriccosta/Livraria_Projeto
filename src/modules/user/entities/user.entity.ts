import { Book } from 'src/modules/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', orderBy: { id: 'ASC' } })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'double', name: 'cash', nullable: false })
  cash: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
    nullable: false,
    select: false,
  })
  password: string;

  @OneToMany(() => Book, (book) => book.user, { onDelete: 'CASCADE' })
  books: Book[];
}
