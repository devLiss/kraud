import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationView } from './pagination.view';
import { UserView } from './user.view';

export class AllUsersView extends PaginationView {
  @ApiProperty({ type: [UserView] })
  items: Array<UserView>;
}
