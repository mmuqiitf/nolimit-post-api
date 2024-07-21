import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // add updatedAt field
    return this.userModel.update(
      {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
        updatedAt: new Date(),
      },
      {
        where: {
          id,
        },
      },
    );
  }

  remove(id: number) {
    return this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}
