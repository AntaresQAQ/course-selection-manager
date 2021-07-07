import { ArrayNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentRemoveStudentsRequestDto {
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}
