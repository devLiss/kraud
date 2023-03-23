import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ name: 'pageNum', default: 1, type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageNum = 1;

  @ApiPropertyOptional({ name: 'pageSize', default: 10, type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageSize = 10;
}
