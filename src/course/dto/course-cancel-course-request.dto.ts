import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CourseCancelCourseRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly studentId: number;

  @ApiProperty()
  @IsNumber()
  readonly courseId: number;
}
