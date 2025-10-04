import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsDate,
} from 'class-validator';

export class BaseUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  pseudo: string;

  @IsOptional()
  @IsString()
  artistName: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDate()
  birthday: Date;

  @IsString()
  country: string;

  @IsString()
  genre: string;
}
