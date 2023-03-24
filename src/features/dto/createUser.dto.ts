import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ minLength: 3, maxLength: 10, required: true })
  @Length(3, 10)
  @IsString()
  name: string;

  @ApiProperty({ required: true, pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsString()
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 15, required: true })
  @Length(8, 15)
  @IsString()
  password: string;
}
