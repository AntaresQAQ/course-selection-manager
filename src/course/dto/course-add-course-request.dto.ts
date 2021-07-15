import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CourseAddCourseRequestDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20)
  readonly teacher: string;

  @ApiProperty()
  @IsNumber()
  readonly studentsLimit: number;

  @ApiProperty()
  @IsNumber()
  readonly selectionId: number;
}
