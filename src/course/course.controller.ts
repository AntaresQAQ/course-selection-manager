import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { SelectionService } from '@/selection/selection.service';

import {
  CourseAddCourseRequestDto,
  CourseAddCourseResponseDto,
  CourseAddCourseResponseError,
  CourseRemoveCourseRequestDto,
  CourseRemoveCourseResponseDto,
  CourseRemoveCourseResponseError,
} from './dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly selectionService: SelectionService,
  ) {}

  @ApiOperation({
    summary: 'A request to add course into selection',
    description: 'Admin only',
  })
  @Post('addCourse')
  async addCourse(
    @Session() session: Record<string, any>,
    @Body() request: CourseAddCourseRequestDto,
  ): Promise<CourseAddCourseResponseDto> {
    if (!session.uid || !session.type) {
      return { error: CourseAddCourseResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: CourseAddCourseResponseError.PERMISSION_DENIED };
    }

    const selection = await this.selectionService.findSelectionById(
      request.selectionId,
    );
    if (!selection) {
      return { error: CourseAddCourseResponseError.SELECTION_ID_NOT_EXISTS };
    }

    const course = await this.courseService.addCourse(
      request.name,
      request.teacher,
      request.studentsLimit,
      selection,
    );

    return {
      info: {
        id: course.id,
        name: course.name,
        teacher: course.teacher,
        currentStudent: course.currentStudent,
        studentsLimit: course.studentsLimit,
      },
    };
  }

  @ApiOperation({
    summary: 'A request to remove course',
    description: 'Admin only',
  })
  @Post('removeCourse')
  async removeCourse(
    @Session() session: Record<string, any>,
    @Body() request: CourseRemoveCourseRequestDto,
  ): Promise<CourseRemoveCourseResponseDto> {
    if (!session.uid || !session.type) {
      return { error: CourseRemoveCourseResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: CourseRemoveCourseResponseError.PERMISSION_DENIED };
    }
    await this.courseService.removeCourse(request.id);
    return { result: 'SUCCEED' };
  }
}
