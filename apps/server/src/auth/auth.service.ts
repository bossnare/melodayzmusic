import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import { Role } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async signToken(
    id: string,
    email: string,
    username: string,
    role: Role,
  ) {
    const payload = {
      sub: id,
      email: email,
      role: role,
      username: username,
    };

    const token = await this.jwt.signAsync(payload);

    return { access_token: token };
  }

  async register(registerDto: RegisterDto) {
    // hashing this plainpassword
    const hashedPassword = await argon2.hash(registerDto.password);
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        username: '@' + registerDto.firstName.toLowerCase(),
        password: hashedPassword,
      },
    });
  }

  // user login
  async login(loginDto: LoginDto) {
    // find user with unique email or username
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginDto.email }, { username: loginDto.username }],
      },
    });

    if (!user)
      throw new ForbiddenException("Access denied, account doesn't exist");

    const pwMatches = await argon2.verify(user.password, loginDto.password);
    if (!pwMatches) throw new ForbiddenException('Invalid password');
    // create user jwt token
    return this.signToken(user.id, user.email, user.username, user.role);
  }

  // change password
  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    const { oldPassword, newPassword } = changePasswordDto;

    if (!user) throw new NotFoundException('User Not Found');

    // compare two password: password typed by user and on db
    const isValidPassword = await argon2.verify(user.password, oldPassword);
    if (!isValidPassword)
      throw new ForbiddenException('Invalid actual password');

    const newHashedPassword = await argon2.hash(newPassword);
    return this.prisma.user.update({
      where: { id },
      data: {
        password: newHashedPassword,
      },
    });
  }

  // forgot-password request
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found!');
    // get random uuid
    const token = crypto.randomUUID();
    const hashedToken = await argon2.hash(token); // hash this token (security)

    await this.prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExp: dayjs().add(15, 'minutes').toDate(), //new Date(Date.now() + 1000 * 60 * 15)
      },
    });

    // return URL or send mail
    const resetUrl = `https://melodayzmusic.vercel.app/auth/reset-password?token=${token}&email=${email}`;

    return {
      url: resetUrl,
    };
  }

  // reset password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, token, newPassword } = resetPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.resetToken || !user.resetTokenExp) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const isValid = await argon2.verify(user.resetToken, token);

    if (!isValid || dayjs().isAfter(user.resetTokenExp)) {
      throw new BadRequestException('Invalid token or expired');
    }

    // if passed
    const newHashedPassword = await argon2.hash(newPassword);

    await this.prisma.user.update({
      where: { email: resetPasswordDto.email },
      data: {
        password: newHashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });
  }
}
