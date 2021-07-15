import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SelectionRemoveSelectionRequestDto {
  @ApiProperty()
  @IsNumber()
  readonly selectionId: number;
}
