import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageNum = 1;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageSize = 10;
}
