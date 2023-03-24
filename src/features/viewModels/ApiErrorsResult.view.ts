import { ApiProperty } from '@nestjs/swagger';
import { FieldErrorView } from './FieldError.view';

export class ApiErrorsResultView {
  @ApiProperty({
    type: [FieldErrorView],
    name: 'errorsMessages',
    description: '',
  })
  errorsMessages: Array<FieldErrorView>;
}
