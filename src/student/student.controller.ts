import { Body, Controller, Post, Session } from '@nestjs/common';

import { StudentService } from './student.service';

import { AddStudentsRequestDto } from './dto/add-students-request.dto';
import {
  AddStudentsResponseDto,
  AddStudentsResponseError,
} from './dto/add-students-response.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('login')
  async login(@Session() session: Record<string, any>) {
    if (session.id && session.type) {
      // ALREADY_LOGGED
    }
  }

  @Post('reset')
  async reset(@Session() session: Record<string, any>) {
    if (!session.id || !session.type) {
      // NOT_LOGGED
    }
  }

  @Post('addStudents')
  async addStudents(
    @Session() session: Record<string, any>,
    @Body() request: AddStudentsRequestDto,
  ): Promise<AddStudentsResponseDto> {
    if (!session.id || !session.type) {
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
