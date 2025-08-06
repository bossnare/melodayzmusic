import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const hashed = await argon2.hash(registerDto.password);
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: hashed,
      },
    });
  }
}
