import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Role } from '../generated/prisma/enums.js';
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

  private async signToken(userId: string, email: string, role: Role) {
    const payload = {
      sub: userId,
      email: email,
      role: role,
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

    if (!user) throw new ForbiddenException('Access denied');

    const pwMatches = await argon2.verify(user.password, loginDto.password);
    if (!pwMatches) throw new ForbiddenException('Invalid credentials');

    return this.signToken(user.id, user.email, user.role);
  }
}
