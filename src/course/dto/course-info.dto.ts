import { ApiProperty } from '@nestjs/swagger';

export class CourseInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teacher: string;

  @ApiProperty()
  studentsLimit: number;

  @ApiProperty()
  currentStudent: number;
}
