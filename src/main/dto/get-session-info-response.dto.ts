import { ApiProperty } from '@nestjs/swagger';
import { StudentInfo } from '@/student/dto/student-info.dto';
import { AdminInfo } from '@/admin/dto/admin-info.dto';

export class GetSessionInfoResponseDto {
  @ApiProperty()
  type?: 'admin' | 'student';

  @ApiProperty({ type: AdminInfo })
  adminInfo?: AdminInfo;

  @ApiProperty({ type: StudentInfo })
  studentInfo?: StudentInfo;
}
