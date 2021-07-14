import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class SelectionRemoveStudentsRequestDto {
  @ApiProperty()
  @IsNumber()
  selectionId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  studentIds: number[];
}
