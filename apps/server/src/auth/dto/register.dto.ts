import { BaseUserDto } from '../../user/dto/base-user.dto.js';
import { IsString } from 'class-validator';

export class RegisterDto extends BaseUserDto {}

export class EmailCheckDto {
  @IsString()
  email: string;
}

export class UsernameCheckDto {
  @IsString()
  username: string;
}
