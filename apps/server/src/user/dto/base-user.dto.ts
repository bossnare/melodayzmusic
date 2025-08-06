import { IsEmail, IsString } from 'class-validator';

export class BaseUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
