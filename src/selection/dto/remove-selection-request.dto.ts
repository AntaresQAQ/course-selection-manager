import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveSelectionRequestDto {
  @ApiProperty()
  @IsNumber()
  selectionId: number;
}
