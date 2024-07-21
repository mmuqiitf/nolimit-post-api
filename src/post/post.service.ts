import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postModel.create({
      title: createPostDto.title,
      content: createPostDto.content,
      authorId: createPostDto.authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll() {
    return this.postModel.findAll();
  }

  findOne(id: number) {
    return this.postModel.findByPk(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postModel.update(
      {
        title: updatePostDto.title,
        content: updatePostDto.content,
        authorId: updatePostDto.authorId,
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
    return this.postModel.destroy({
      where: {
        id,
      },
    });
  }
}
