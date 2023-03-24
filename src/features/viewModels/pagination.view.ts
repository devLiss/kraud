import { ApiProperty } from '@nestjs/swagger';

export class PaginationView {
  @ApiProperty({ default: 0 })
  pagesCount: number;
  @ApiProperty({ default: 0 })
  page: number;
  @ApiProperty({ default: 0 })
  pageSize: number;
  @ApiProperty({ default: 0 })
  total: number;
}
