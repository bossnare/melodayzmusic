import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsDate,
} from 'class-validator';
import { Type } from "class-transformer";

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

  @Type(() => Date)
  @IsDate({ message: "La date de naissance doit être valide." })
  @IsDate()
  birthday: Date;

  @IsString()
  country: string;

  @IsString()
  genre: string;
}
