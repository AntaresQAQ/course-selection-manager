import { ApiProperty } from '@nestjs/swagger';
import { StudentInfo } from '@/student/dto';
import { CourseInfoDto } from '@/course/dto';

export class SelectionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    isArray: true,
    type: StudentInfo,
  })
  students?: StudentInfo[];

  @ApiProperty({
    isArray: true,
    type: CourseInfoDto,
  })
  courses?: CourseInfoDto[];
}
