import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SelectionService } from './selection.service';
import { StudentService } from '@/student/student.service';
import { StudentEntity } from '@/student/student.entity';

import {
  AddSelectionRequestDto,
  AddSelectionResponseDto,
  AddSelectionResponseError,
  RemoveSelectionRequestDto,
  RemoveSelectionResponseDto,
  RemoveSelectionResponseError,
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
    @Body() request: AddSelectionRequestDto,
  ): Promise<AddSelectionResponseDto> {
    if (!session.uid || !session.type) {
      return { error: AddSelectionResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: AddSelectionResponseError.PERMISSION_DENIED };
    }
    const studentIds: number[] = Array.from(new Set(request.studentIds));
    const students = await this.studentService.findStudentsByIds(studentIds);
    if (students.length !== studentIds.length) {
      return { error: AddSelectionResponseError.STUDENT_ID_NOT_EXISTS };
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
    @Body() request: RemoveSelectionRequestDto,
  ): Promise<RemoveSelectionResponseDto> {
    if (!session.uid || !session.type) {
      return { error: RemoveSelectionResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: RemoveSelectionResponseError.PERMISSION_DENIED };
    }
    await this.selectionService.removeSelection(request.selectionId);
    return { result: 'SUCCEED' };
  }

  @Post('addStudents')
  async addStudents() {}

  @Post('removeStudents')
  async removeStudents() {}

  @Post('getStudentSelections')
  async getSelections() {}

  @Post('getSelectionStudents')
  async getSelectionStudents() {}
}
