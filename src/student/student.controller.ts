import { Body, Controller, Post, Session } from '@nestjs/common';

import { StudentService } from './student.service';

import { StudentAddStudentsRequestDto } from './dto/student-add-students-request.dto';
import {
  StudentAddStudentsResponseDto,
  StudentAddStudentsResponseError,
} from './dto/student-add-students-response.dto';
import { StudentLoginRequestDto } from './dto/student-login-request.dto';
import {
  StudentLoginResponseDto,
  StudentLoginResponseError,
} from './dto/student-login-response.dto';
import { StudentRemoveStudentsRequestDto } from './dto/student-remove-students-request.dto';
import {
  StudentRemoveStudentsResponseDto,
  StudentRemoveStudentsResponseError,
} from './dto/student-remove-students-response.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() request: StudentLoginRequestDto,
  ): Promise<StudentLoginResponseDto> {
    if (session.uid && session.type) {
      return {
        error: StudentLoginResponseError.ALREADY_LOGGED,
      };
    }
    const student = await this.studentService.findStudentById(request.id);
    if (!student) {
      return {
        error: StudentLoginResponseError.ERROR_STUDENT_ID,
      };
    }
    if (!(await this.studentService.checkPassword(student, request.password))) {
      return {
        error: StudentLoginResponseError.ERROR_PASSWORD,
      };
    }
    session.uid = student.id;
    session.type = 'student';
    return {
      sessionInfo: {
        type: 'student',
        info: {
          id: student.id,
          name: student.name,
          major: student.major,
        },
      },
    };
  }

  @Post('reset')
  async reset(@Session() session: Record<string, any>) {
    if (!session.uid || !session.type) {
      // NOT_LOGGED
    }
  }

  @Post('addStudents')
  async addStudents(
    @Session() session: Record<string, any>,
    @Body() request: StudentAddStudentsRequestDto,
  ): Promise<StudentAddStudentsResponseDto> {
    if (!session.uid || !session.type) {
      return {
        error: StudentAddStudentsResponseError.NOT_LOGGED,
      };
    }
    if (session.type !== 'admin') {
      return {
        error: StudentAddStudentsResponseError.PERMISSION_DENIED,
      };
    }

    const studentIdSet = new Set();
    request.students.forEach((student) => studentIdSet.add(student.id));
    if (studentIdSet.size !== request.students.length) {
      return {
        error: StudentAddStudentsResponseError.STUDENTS_CONFLICT,
      };
    }
    const studentsFound = await this.studentService.findStudentsByIds(
      request.students.map((student) => student.id),
    );
    if (studentsFound.length > 0) {
      return {
        error: StudentAddStudentsResponseError.ID_ALREADY_EXISTS,
      };
    }
    await this.studentService.registerStudents(request.students);
    return {
      result: 'SUCCEED',
    };
  }

  @Post('removeStudents')
  async removeStudents(
    @Session() session: Record<string, any>,
    @Body() request: StudentRemoveStudentsRequestDto,
  ): Promise<StudentRemoveStudentsResponseDto> {
    if (!session.uid || !session.type) {
      return {
        error: StudentRemoveStudentsResponseError.NOT_LOGGED,
      };
    }
    if (session.type !== 'admin') {
      return {
        error: StudentRemoveStudentsResponseError.PERMISSION_DENIED,
      };
    }
    await this.studentService.deleteStudents(request.ids);
    return {
      result: 'SUCCEED',
    };
  }
}
