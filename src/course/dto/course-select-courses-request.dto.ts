import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CourseSelectCoursesRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  studentId: number;

  @ApiProperty()
  @IsNumber()
  selectionId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  courseIds: number[];
}
