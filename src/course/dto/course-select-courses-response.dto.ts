import { ApiProperty } from '@nestjs/swagger';

export enum CourseSelectCoursesResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SELECTION_ID_NOT_EXISTS = 'SELECTION_ID_NOT_EXISTS',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
  COURSE_ID_NOT_EXISTS = 'COURSE_ID_NOT_EXISTS',
  COURSE_ALREADY_SELECTED = 'COURSE_ALREADY_SELECTED',
  STUDENT_LIMIT_EXCEED = 'STUDENT_LIMIT_EXCEED',
}

export class CourseSelectCoursesResponseDto {
  @ApiProperty({ enum: CourseSelectCoursesResponseError })
  error?: CourseSelectCoursesResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
