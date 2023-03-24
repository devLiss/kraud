import { PaginationView } from './pagination.view';
import { CityView } from './city.view';
import { ApiProperty } from '@nestjs/swagger';

export class AllCitiesView extends PaginationView {
  @ApiProperty({ type: [CityView] })
  items: Array<CityView>;
}
