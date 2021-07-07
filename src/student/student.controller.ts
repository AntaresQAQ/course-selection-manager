import { Body, Controller, Post, Session } from '@nestjs/common';

import { StudentService } from './student.service';

import { AddStudentsRequestDto } from './dto/add-students-request.dto';
import {
  AddStudentsResponseDto,
  AddStudentsResponseError,
} from './dto/add-students-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto, LoginResponseError } from './dto/login-response.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() request: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    if (session.uid && session.type) {
      return {
        error: LoginResponseError.ALREADY_LOGGED,
      };
    }
    const student = await this.studentService.findStudentById(request.id);
    if (!student) {
      return {
        error: LoginResponseError.ERROR_STUDENT_ID,
      };
    }
    if (!(await this.studentService.checkPassword(student, request.password))) {
      return {
        error: LoginResponseError.ERROR_PASSWORD,
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
    @Body() request: AddStudentsRequestDto,
  ): Promise<AddStudentsResponseDto> {
    if (!session.uid || !session.type) {
      return {
        error: AddStudentsResponseError.NOT_LOGGED,
      };
    }
    if (session.type !== 'admin') {
      return {
        error: AddStudentsResponseError.PERMISSION_DENIED,
      };
    }

    const studentIdSet = new Set();
    request.students.forEach((student) => studentIdSet.add(student.id));
    if (studentIdSet.size !== request.students.length) {
      return {
        error: AddStudentsResponseError.STUDENTS_CONFLICT,
      };
    }
    const studentsFound = await this.studentService.findStudentsByIds(
      request.students.map((student) => student.id),
    );
    if (studentsFound.length > 0) {
      return {
        error: AddStudentsResponseError.ID_ALREADY_EXISTS,
      };
    }
    await this.studentService.registerStudents(request.students);
    return {
      result: 'SUCCEED',
    };
  }
}
