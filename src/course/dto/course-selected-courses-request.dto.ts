import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CourseSelectedCoursesRequestDto {
  @ApiProperty()
  @IsNumber()
  readonly studentId: number;
}
