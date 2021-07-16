import { ApiProperty } from '@nestjs/swagger';
import { CourseInfoDto } from '.';

export enum CourseSelectedCoursesResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
}

export class CourseSelectedCoursesResponseDto {
  @ApiProperty({ enum: CourseSelectedCoursesResponseError })
  error?: CourseSelectedCoursesResponseError;

  @ApiProperty({ isArray: true, type: CourseInfoDto })
  courses?: CourseInfoDto[];
}
