import { ApiProperty } from '@nestjs/swagger';

export class FieldErrorView {
  @ApiProperty({
    nullable: true,
    description: 'Message with error explanation for certain field',
  })
  message: string;
  @ApiProperty({ description: 'What field/property of input model has error' })
  field: string;
}
