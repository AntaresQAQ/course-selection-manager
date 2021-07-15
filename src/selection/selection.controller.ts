import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SelectionService } from './selection.service';
import { SelectionEntity } from './selection.entity';
import { StudentService } from '@/student/student.service';
import { StudentEntity } from '@/student/student.entity';
import { CourseEntity } from '@/course/course.entity';

import {
  SelectionInfoDto,
  SelectionGetListRequestDto,
  SelectionGetListResponseDto,
  SelectionGetListResponseError,
  SelectionGetInfoRequestDto,
  SelectionGetInfoResponseDto,
  SelectionGetInfoResponseError,
  SelectionAddSelectionRequestDto,
  SelectionAddSelectionResponseDto,
  SelectionAddSelectionResponseError,
  SelectionRemoveSelectionRequestDto,
  SelectionRemoveSelectionResponseDto,
  SelectionRemoveSelectionResponseError,
  SelectionAddStudentsRequestDto,
  SelectionAddStudentsResponseDto,
  SelectionAddStudentsResponseError,
  SelectionRemoveStudentsRequestDto,
  SelectionRemoveStudentsResponseDto,
  SelectionRemoveStudentsResponseError,
} from './dto';
import { StudentInfo } from '@/student/dto';
import { CourseInfoDto } from '@/course/dto';

@ApiTags('Selection')
@Controller('selection')
export class SelectionController {
  constructor(
    private readonly selectionService: SelectionService,
    private readonly studentService: StudentService,
  ) {}

  @ApiOperation({
    summary: 'A request to get selections list',
    description:
      'Can only get selections which the current student has except admin',
  })
  @Post('getList')
  async getList(
    @Session() session: Record<string, any>,
    @Body() request: SelectionGetListRequestDto,
  ): Promise<SelectionGetListResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionGetListResponseError.NOT_LOGGED };
    }

    if (session.type === 'admin') {
      let selections: SelectionEntity[];
      if (request.studentId) {
        const student = await this.studentService.findStudentById(
          request.studentId,
          true,
        );
        if (!student) {
          return { error: SelectionGetListResponseError.STUDENT_ID_NOT_EXISTS };
        }
        selections = student.selections;
      } else {
        selections = await this.selectionService.findAll();
      }

      return {
        selections: selections.map(
          (selection: SelectionEntity): SelectionInfoDto => ({
            id: selection.id,
            name: selection.name,
          }),
        ),
      };
    } else {
      const studentId = request.studentId || session.uid;
      if (studentId !== session.uid) {
        return { error: SelectionGetListResponseError.PERMISSION_DENIED };
      }

      const student = await this.studentService.findStudentById(
        studentId,
        true,
      );
      if (!student) {
        return { error: SelectionGetListResponseError.STUDENT_ID_NOT_EXISTS };
      }

      return {
        selections: student.selections.map(
          (selection: SelectionEntity): SelectionInfoDto => ({
            id: selection.id,
            name: selection.name,
          }),
        ),
      };
    }
  }

  @ApiOperation({
    summary: 'A request to get selection information',
    description: 'Only Admin can get students in selection',
  })
  @Post('getInfo')
  async getInfo(
    @Session() session: Record<string, any>,
    @Body() request: SelectionGetInfoRequestDto,
  ): Promise<SelectionGetInfoResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionGetInfoResponseError.NOT_LOGGED };
    }
    const selection = await this.selectionService.findSelectionById(
      request.id,
      true,
    );
    if (!selection) {
      return { error: SelectionGetInfoResponseError.SELECTION_ID_NOT_EXISTS };
    }
    const flag =
      session.type !== 'admin' &&
      !selection.students.map((student) => student.id).includes(session.uid);
    if (flag) {
      return { error: SelectionGetInfoResponseError.PERMISSION_DENIED };
    }
    return {
      info: {
        id: selection.id,
        name: selection.name,
        courses: selection.courses.map(
          (course: CourseEntity): CourseInfoDto => ({
            id: course.id,
            name: course.name,
            teacher: course.teacher,
            currentStudent: course.currentStudent,
            studentsLimit: course.studentsLimit,
          }),
        ),
        students:
          session.type === 'admin'
            ? selection.students.map(
                (student: StudentEntity): StudentInfo => ({
                  id: student.id,
                  name: student.name,
                  major: student.major,
                }),
              )
            : undefined,
      },
    };
  }

  @ApiOperation({
    summary: 'A request to add selection for student accounts',
    description: 'Admin only',
  })
  @Post('addSelection')
  async addSelection(
    @Session() session: Record<string, any>,
    @Body() request: SelectionAddSelectionRequestDto,
  ): Promise<SelectionAddSelectionResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionAddSelectionResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: SelectionAddSelectionResponseError.PERMISSION_DENIED };
    }
    const studentIds: number[] = Array.from(new Set(request.studentIds));
    const students = await this.studentService.findStudentsByIds(studentIds);
    if (students.length !== studentIds.length) {
      return {
        error: SelectionAddSelectionResponseError.STUDENT_ID_NOT_EXISTS,
      };
    }
    const selection = await this.selectionService.addSelection(
      request.name,
      students,
    );
    return {
      result: 'SUCCEED',
      selection: {
        id: selection.id,
        name: selection.name,
        students: students.map(
          (student: StudentEntity): StudentInfo => ({
            id: student.id,
            name: student.name,
            major: student.major,
          }),
        ),
      },
    };
  }

  @ApiOperation({
    summary: 'A request to remove selections',
    description: 'Admin only',
  })
  @Post('removeSelection')
  async removeSelection(
    @Session() session: Record<string, any>,
    @Body() request: SelectionRemoveSelectionRequestDto,
  ): Promise<SelectionRemoveSelectionResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionRemoveSelectionResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: SelectionRemoveSelectionResponseError.PERMISSION_DENIED };
    }
    await this.selectionService.removeSelection(request.selectionId);
    return { result: 'SUCCEED' };
  }

  @ApiOperation({
    summary: 'A request to add students into selection',
    description: 'Admin only',
  })
  @Post('addStudents')
  async addStudents(
    @Session() session: Record<string, any>,
    @Body() request: SelectionAddStudentsRequestDto,
  ): Promise<SelectionAddStudentsResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionAddStudentsResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: SelectionAddStudentsResponseError.PERMISSION_DENIED };
    }
    let selection = await this.selectionService.findSelectionById(
      request.selectionId,
      true,
    );
    if (!selection) {
      return {
        error: SelectionAddStudentsResponseError.SELECTION_ID_NOT_EXISTS,
      };
    }
    const studentIds: number[] = Array.from(new Set(request.studentIds));
    const students = await this.studentService.findStudentsByIds(studentIds);
    if (students.length !== studentIds.length) {
      return {
        error: SelectionAddStudentsResponseError.STUDENT_ID_NOT_EXISTS,
      };
    }

    selection = await this.selectionService.addStudents(selection, students);

    return {
      result: 'SUCCEED',
      selection: {
        id: selection.id,
        name: selection.name,
        students: selection.students.map(
          (student: StudentEntity): StudentInfo => ({
            id: student.id,
            name: student.name,
            major: student.major,
          }),
        ),
      },
    };
  }

  @ApiOperation({
    summary: 'A request to remove students from selection',
    description: 'Admin only',
  })
  @Post('removeStudents')
  async removeStudents(
    @Session() session: Record<string, any>,
    @Body() request: SelectionRemoveStudentsRequestDto,
  ): Promise<SelectionRemoveStudentsResponseDto> {
    if (!session.uid || !session.type) {
      return { error: SelectionRemoveStudentsResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: SelectionRemoveStudentsResponseError.PERMISSION_DENIED };
    }

    const selection = await this.selectionService.findSelectionById(
      request.selectionId,
      true,
    );
    if (!selection) {
      return {
        error: SelectionRemoveStudentsResponseError.SELECTION_ID_NOT_EXISTS,
      };
    }
    await this.selectionService.removeStudents(selection, request.studentIds);
    return { result: 'SUCCEED' };
  }
}
