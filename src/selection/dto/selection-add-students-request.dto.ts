import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SelectionAddStudentsRequestDto {
  @ApiProperty()
  @IsNumber()
  readonly selectionId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  readonly studentIds: number[];
}
