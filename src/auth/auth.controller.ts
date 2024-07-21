import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.signUp(createUserDto);

    return {
      user,
      message: 'User has been created. Please sign in.',
    };
  }
}
