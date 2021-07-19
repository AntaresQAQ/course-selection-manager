import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AdminService } from '@/admin/admin.service';
import { StudentService } from '@/student/student.service';

import { GetSessionInfoResponseDto } from './dto';
import { AdminInfo } from '@/admin/dto/admin-info.dto';
import { StudentInfo } from '@/student/dto/student-info.dto';

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
  ): Promise<GetSessionInfoResponseDto> {
    if (type === 'admin') {
      const admin = await this.adminService.findAdminById(id);
      const adminInfo: AdminInfo = admin && {
        id: admin.id,
        username: admin.username,
      };
      return { type, adminInfo };
    } else if (type === 'student') {
      const student = await this.studentService.findStudentById(id);
      const studentInfo: StudentInfo = student && {
        id: student.id,
        name: student.name,
        major: student.major,
      };
      return { type, studentInfo };
    }
  }
}
