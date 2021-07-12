import { ApiProperty } from '@nestjs/swagger';
import { StudentInfo } from '@/student/dto';

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
}
