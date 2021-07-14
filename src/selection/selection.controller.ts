import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SelectionService } from './selection.service';
import { StudentService } from '@/student/student.service';
import { StudentEntity } from '@/student/student.entity';

import {
  SelectionAddSelectionRequestDto,
  SelectionAddSelectionResponseDto,
  SelectionAddSelectionResponseError,
  SelectionAddStudentsRequestDto,
  SelectionAddStudentsResponseDto,
  SelectionAddStudentsResponseError,
  SelectionRemoveSelectionRequestDto,
  SelectionRemoveSelectionResponseDto,
  SelectionRemoveSelectionResponseError,
} from './dto';
import { StudentInfo } from '@/student/dto';

@ApiTags('Selection')
@Controller('selection')
export class SelectionController {
  constructor(
    private readonly selectionService: SelectionService,
    private readonly studentService: StudentService,
  ) {}

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

  @Post('removeStudents')
  async removeStudents() {}

  @Post('getStudentSelections')
  async getSelections() {}

  @Post('getSelectionStudents')
  async getSelectionStudents() {}
}
