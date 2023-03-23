import { ApiProperty } from '@nestjs/swagger';
import { FieldErrorView } from './FieldError.view';

export class ApiErrorsResultView {
  @ApiProperty({ name: 'errorsMessages', description: '' })
  errorsMessages: FieldErrorView[];
}
