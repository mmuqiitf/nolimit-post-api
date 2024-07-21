import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
