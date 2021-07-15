import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CourseSelectCoursesRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly studentId: number;

  @ApiProperty()
  @IsNumber()
  readonly selectionId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  readonly courseIds: number[];
}
