import { ApiProperty } from '@nestjs/swagger';

export class LoginView {
  @ApiProperty({ name: 'accessToken', description: 'JWT access token' })
  accessToken: string;
}
