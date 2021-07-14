import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString, Length } from 'class-validator';

export class SelectionAddSelectionRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  readonly name: string;

  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  studentIds: number[];
}
