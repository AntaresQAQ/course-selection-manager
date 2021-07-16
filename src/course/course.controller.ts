import { Body, Controller, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CourseEntity } from './course.entity';
import { SelectionService } from '@/selection/selection.service';
import { SelectionEntity } from '@/selection/selection.entity';
import { StudentService } from '@/student/student.service';

import {
  CourseInfoDto,
  CourseSelectedCoursesRequestDto,
  CourseSelectedCoursesResponseDto,
  CourseSelectedCoursesResponseError,
  CourseAddCourseRequestDto,
  CourseAddCourseResponseDto,
  CourseAddCourseResponseError,
  CourseRemoveCourseRequestDto,
  CourseRemoveCourseResponseDto,
  CourseRemoveCourseResponseError,
  CourseSelectCoursesRequestDto,
  CourseSelectCoursesResponseDto,
  CourseSelectCoursesResponseError,
  CourseCancelCourseRequestDto,
  CourseCancelCourseResponseDto,
  CourseCancelCourseResponseError,
} from './dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly selectionService: SelectionService,
    private readonly studentService: StudentService,
  ) {}

  @ApiOperation({
    summary: 'A request to get selected courses',
    description: 'Can only get courses selected by oneself except admin',
  })
  @Post('selectedCourses')
  async selectedCourse(
    @Session() session: Record<string, any>,
    @Body() request: CourseSelectedCoursesRequestDto,
  ): Promise<CourseSelectedCoursesResponseDto> {
    if (!session.uid || !session.type) {
      return { error: CourseSelectedCoursesResponseError.NOT_LOGGED };
    }

    if (session.type === 'admin' && !request.studentId) {
      return {
        error: CourseSelectedCoursesResponseError.STUDENT_ID_NOT_EXISTS,
      };
    }

    const studentId = request.studentId || session.uid;
    if (session.type !== 'admin' && studentId !== session.uid) {
      return { error: CourseSelectedCoursesResponseError.PERMISSION_DENIED };
    }

    const student = await this.studentService.findStudentById(studentId, true);
    if (!student) {
      return {
        error: CourseSelectedCoursesResponseError.STUDENT_ID_NOT_EXISTS,
      };
    }
    return {
      courses: student.courses.map(
        (course: CourseEntity): CourseInfoDto => ({
          id: course.id,
          name: course.name,
          teacher: course.teacher,
          currentStudent: course.currentStudent,
          studentsLimit: course.studentsLimit,
        }),
      ),
    };
  }

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

  @ApiOperation({
    summary: 'A request to select course for student',
    description: 'Can only select course for oneself except admin',
  })
  @Post('selectCourses')
  async selectCourses(
    @Session() session: Record<string, any>,
    @Body() request: CourseSelectCoursesRequestDto,
  ): Promise<CourseSelectCoursesResponseDto> {
    if (!session.uid || !session.type) {
      return { error: CourseSelectCoursesResponseError.NOT_LOGGED };
    }

    if (session.type === 'admin' && !request.studentId) {
      return { error: CourseSelectCoursesResponseError.STUDENT_ID_NOT_EXISTS };
    }

    const studentId = request.studentId || session.uid;
    if (session.type !== 'admin' && studentId !== session.uid) {
      return { error: CourseSelectCoursesResponseError.PERMISSION_DENIED };
    }

    const student = await this.studentService.findStudentById(studentId, true);
    if (!student) {
      return { error: CourseSelectCoursesResponseError.STUDENT_ID_NOT_EXISTS };
    }

    if (
      !student.selections
        .map((selection: SelectionEntity) => selection.id)
        .includes(request.selectionId)
    ) {
      return { error: CourseSelectCoursesResponseError.PERMISSION_DENIED };
    }

    const selection = await this.selectionService.findSelectionById(
      request.selectionId,
      true,
    );
    if (!selection) {
      return {
        error: CourseSelectCoursesResponseError.SELECTION_ID_NOT_EXISTS,
      };
    }

    const selectionCourseIds = selection.courses.map(
      (course: CourseEntity) => course.id,
    );
    const studentCourseIds = student.courses.map(
      (course: CourseEntity) => course.id,
    );
    for (const courseId of request.courseIds) {
      if (!selectionCourseIds.includes(courseId)) {
        return { error: CourseSelectCoursesResponseError.COURSE_ID_NOT_EXISTS };
      }
      if (studentCourseIds.includes(courseId)) {
        return {
          error: CourseSelectCoursesResponseError.COURSE_ALREADY_SELECTED,
        };
      }
    }
    try {
      await this.courseService.selectCourse(
        request.studentId,
        request.courseIds,
      );
    } catch {
      return { error: CourseSelectCoursesResponseError.STUDENT_LIMIT_EXCEED };
    }
    return { result: 'SUCCEED' };
  }

  @ApiOperation({
    summary: 'A request to cancel a selected course for student',
    description: 'Can only cancel for oneself except admin',
  })
  @Post('cancelCourse')
  async cancelCourse(
    @Session() session: Record<string, any>,
    @Body() request: CourseCancelCourseRequestDto,
  ): Promise<CourseCancelCourseResponseDto> {
    if (!session.uid || !session.type) {
      return { error: CourseCancelCourseResponseError.NOT_LOGGED };
    }

    if (session.type === 'admin' && !request.studentId) {
      return { error: CourseCancelCourseResponseError.STUDENT_ID_NOT_EXISTS };
    }

    const studentId = request.studentId || session.uid;
    if (session.type !== 'admin' && studentId !== session.uid) {
      return { error: CourseCancelCourseResponseError.PERMISSION_DENIED };
    }

    const course = await this.courseService.findCourseById(
      request.courseId,
      true,
    );
    if (!course) {
      return { error: CourseCancelCourseResponseError.COURSE_ID_NOT_EXISTS };
    }
    await this.courseService.cancelCourse(course, studentId);
    return { result: 'SUCCEED' };
  }
}
