import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SelectionRemoveStudentsRequestDto {
  @ApiProperty()
  @IsNumber()
  readonly selectionId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  readonly studentIds: number[];
}
