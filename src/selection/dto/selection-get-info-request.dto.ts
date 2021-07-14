import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SelectionGetInfoRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
