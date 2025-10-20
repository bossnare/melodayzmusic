import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
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
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer'
import {Transporter} from 'nodemailer'

// if you use Resend
// const resend = new Resend(process.env.RESEND_API_KEY);
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
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

  // if you use Resend
  // async sendOtpEmail(toEmail: string, otp: string) {
  //   const mailOptions = {
  //     from: `MelodayzMusic <${process.env.MAIL_FROM}>`,
  //     to: toEmail,
  //     subject: 'Code OTP (6 chiffres)',
  //     html: `<p style="text-align: center">Your OTP for <strong>MelodayzMusic</strong> is:</p>
  //   <h1 style="background: #00aaff; color: white; border-radius: 10px; padding: 10px; margin: 4px; text-align: center">${otp}</h1>
  //   <p>It expires in 10 minutes.</p>
  //   `,
  //   };

  //   try {
  //     const info = await resend.emails.send(mailOptions);
  //     console.log(info);
  //   } catch (error) {
  //     console.log(error);
  //   }

  async sendOtpEmail(toEmail: string, otp: string) {
    const mailOptions = {
      from: `MelodayzMusic <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'OTP code (6 chiffres)',
      text: "Your OTP code",
      htmlContent: `<p style="text-align: center">Your OTP for <strong>MelodayzMusic</strong> is:</p>
    <h1 style="background: #00aaff; color: white; border-radius: 10px; padding: 10px; margin: 4px; text-align: center">${otp}</h1>
    <p>It expires in 10 minutes.</p>
    `,
    };

     try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent:", info.messageId);
     }
      catch (error) {
        console.log(error)
      }

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
