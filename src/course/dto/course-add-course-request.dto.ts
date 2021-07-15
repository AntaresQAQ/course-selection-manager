import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CourseAddCourseRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  teacher: string;

  @ApiProperty()
  @IsNumber()
  studentsLimit: number;

  @ApiProperty()
  @IsNumber()
  selectionId: number;
}
