import { ApiProperty } from '@nestjs/swagger';

export enum CourseCancelCourseResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
  COURSE_ID_NOT_EXISTS = 'COURSE_ID_NOT_EXISTS',
}

export class CourseCancelCourseResponseDto {
  @ApiProperty({ enum: CourseCancelCourseResponseError })
  error?: CourseCancelCourseResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
