import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class BaseUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
