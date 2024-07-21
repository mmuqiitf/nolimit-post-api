import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Post } from 'src/post/post.model';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  updatedAt?: Date;

  @Column
  createdAt?: Date;

  @HasMany(() => Post)
  posts: Post[];
}
