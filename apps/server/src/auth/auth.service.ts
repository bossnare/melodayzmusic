import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async signToken(userId: string, email: string, name: string) {
    const payload = {
      sub: userId,
      email: email,
      name: name,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }

  async register(registerDto: RegisterDto) {
    // hashing this plainpassword
    const hashed = await argon2.hash(registerDto.password);
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: hashed,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user)
      throw new ForbiddenException("Access denied: account doesn't exist");

    const pwMatches = await argon2.verify(user.password, loginDto.password);
    if (!pwMatches) throw new ForbiddenException('Invalid password');

    return this.signToken(user.id, user.email, user.name);
  }

  // forgot-password request
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new NotFoundException('User not found!');
    // get random uuid
    const token = crypto.randomUUID();
    const hashedToken = await argon2.hash(token); // hash this token (security)

    return this.prisma.user.update({
      where: { email: email },
      data: {
        resetToken: hashedToken,
        resetTokenExp: dayjs().add(15, 'minutes').toDate(), //new Date(Date.now() + 1000 * 60 * 15)
      },
    });
  }

  // reset password
  async resetPassword() {}
}
