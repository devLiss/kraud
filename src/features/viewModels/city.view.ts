import { ApiProperty } from '@nestjs/swagger';

export class CityView {
  @ApiProperty({ default: 0 })
  id: number;

  @ApiProperty()
  name: string;
}
