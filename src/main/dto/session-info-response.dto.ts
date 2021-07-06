import { ApiProperty } from '@nestjs/swagger';
import { StudentInfo } from '@/student/dto/student-info.dto';
import { AdminInfo } from '@/admin/dto/admin-info.dto';

export class SessionInfoResponseDto {
  @ApiProperty()
  type?: 'admin' | 'student';

  @ApiProperty()
  info?: StudentInfo | AdminInfo;
}
