import { ApiProperty } from '@nestjs/swagger';

export class UserView {
  @ApiProperty({ default: 0 })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({})
  birthDay: Date;
  @ApiProperty({ pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$' })
  email: string;
  @ApiProperty({ nullable: true })
  city: string;
}
