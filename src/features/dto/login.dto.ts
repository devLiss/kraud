import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsString()
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 15, required: true })
  @Length(8, 15)
  @IsString()
  password: string;
}
