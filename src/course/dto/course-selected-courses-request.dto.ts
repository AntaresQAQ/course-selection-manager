import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CourseSelectedCoursesRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly studentId: number;
}
