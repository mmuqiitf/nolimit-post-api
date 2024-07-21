import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    // get authorization token from request headers
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];

    // verify the token
    const decoded = this.jwtService.verify(token);

    if (decoded.id != createPostDto.authorId) {
      throw new HttpException(
        'You cannot create a post',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    // get authorization token from request headers
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];

    // verify the token
    const decoded = this.jwtService.verify(token);

    if (decoded.id != updatePostDto.authorId) {
      throw new HttpException(
        'You cannot update a post',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    // get authorization token from request headers
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];

    // verify the token
    const decoded = this.jwtService.verify(token);

    const post = await this.postService.findOne(+id);

    if (decoded.id != post.authorId) {
      throw new HttpException(
        'You cannot delete a post',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.postService.remove(+id);
  }
}
