import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { CityService } from './city.service';
import { BearerAuthGuard } from '../../common/guards/bearerAuth.guard';

@UseGuards(BearerAuthGuard)
@Controller('country')
export class CityController {
  constructor(private service: CityService) {}
  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.service.getAll(pagination);
  }
}
