import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SessionInfoResponseDto } from '@/main/dto/session-info-response.dto';
import { AdminService } from '@/admin/admin.service';
import { StudentService } from '@/student/student.service';

@Injectable()
export class MainService {
  constructor(
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async getSessionInfo(
    type: 'admin' | 'student',
    id: number,
  ): Promise<SessionInfoResponseDto> {
    if (type === 'admin') {
      const info = await this.adminService.getAdminInfo(id);
      return { type, info };
    } else if (type === 'student') {
      const info = await this.studentService.getStudentInfo(id);
      return { type, info };
    }
  }
}
