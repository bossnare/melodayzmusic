import { Body, Controller, Patch, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { User as UserEntity } from '../generated/prisma/client.js';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import { User } from './decorators/user.decorator.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import {
  EmailCheckDto,
  RegisterDto,
  UsernameCheckDto,
} from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('email-check')
  emailCheck(@Body() emailCheckDto: EmailCheckDto) {
    return this.authService.checkEmailExist(emailCheckDto);
  }

  @Public()
  @Post('username-check')
  usernameCheck(@Body() usernameCheckDto: UsernameCheckDto) {
    return this.authService.checkUsernameExist(usernameCheckDto);
  }

  @Public()
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    // @Res({ passthrough: true }) res: Response, // if use cookie
  ) {
    return this.authService.login(loginDto);

    // if you use cookies
    // set this token on cookies
    // const { access_token } = await this.authService.login(loginDto);

    // res.cookie('access_token', access_token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'none',
    //   maxAge: 1000 * 60 * 60 * 24,
    // });

    // return { message: 'ok' };
  }

  @Post('logout')
  logout(@User() user: UserEntity, @Res({ passthrough: true }) res: Response) {
    const { id } = user;

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return this.authService.logout(id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('me')
  account(@User() user: UserEntity) {
    return user;
  }

  @Patch('me/change-password')
  changePassword(
    @User() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = user && user.id;
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Get('me/verify')
  accountVerify(@User() user: UserEntity) {
    const verified = user?.verified;
    return { verified: verified ?? false };
  }
}
