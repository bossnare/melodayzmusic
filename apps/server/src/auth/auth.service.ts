import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';
import { Role } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import {
  EmailCheckDto,
  RegisterDto,
  UsernameCheckDto,
} from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { Transporter } from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private transporter: Transporter,
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    }) as Transporter;
  }

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

    const token = await this.jwtService.signAsync(payload);

    // return this generated token
    return { access_token: token };
  }

  // generator OTP
  generatorOtp(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++)
      otp += digits[Math.floor(Math.random() * digits.length)];
    return otp;
  }

  async sendOtpEmail(toEmail: string, otp: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"MelodayzMusic" ${process.env.MAIL_FROM}`,
      to: toEmail,
      subject: 'Your OTP code - MelodayzMusic',
      text: `Code OTP: ${otp} (valid for 10 minutes)`,
      html: `<p>Your OTP for <strong>MelodayzMusic</strong> is:</p>
    <h2>${otp}</h2>
    <p>It expires in 10 minutes.</p>
    `,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const info = await this.transporter.sendMail(mailOptions);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(info.messageId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(registerDto: RegisterDto) {
    // hashing this plainpassword
    const hashedPassword = await argon2.hash(registerDto.password);
    // make pretty exact bithday date
    const birthday = new Date(`${registerDto.birthday}T00:00:00Z`);
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        pseudo: registerDto.pseudo,
        artistName: registerDto.artistName,
        birthday: birthday,
        country: registerDto.country,
        genre: registerDto.genre,
        username: registerDto.username,
        password: hashedPassword,
      },
    });
  }

  // check if exist email
  async checkEmailExist(emailCheckDto: EmailCheckDto) {
    const email = await this.prisma.user.findUnique({
      where: { email: emailCheckDto.email },
    });

    if (email) {
      return { message: 'Email exist', exist: true };
    }
  }

  // check if exist username
  async checkUsernameExist(usernameCheckDto: UsernameCheckDto) {
    const username = await this.prisma.user.findUnique({
      where: { username: usernameCheckDto.username },
    });

    if (username) {
      return { message: 'Username exist', exist: true };
    }
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
      throw new ForbiddenException({
        type: 'account',
        message: "Access denied, account doesn't exist",
      });

    const pwMatches = await argon2.verify(user.password, loginDto.password);
    if (!pwMatches)
      throw new ForbiddenException({
        type: 'password',
        message: 'Invalid password',
      });
    // create user jwt token
    // if use cookies
    // return this.signToken(user.id, user.email, user.username, user.role);
    const { access_token } = await this.signToken(
      user.id,
      user.email,
      user.username,
      user.role,
    );

    return { success: true, access_token: access_token };
  }

  // logout
  async logout(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return {
      message: `user ${user?.pseudo} is successfully logout`,
      status: 'ok',
    };
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
    // hash newPass
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
