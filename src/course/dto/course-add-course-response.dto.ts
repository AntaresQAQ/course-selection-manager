import { ApiProperty } from '@nestjs/swagger';
import { CourseInfoDto } from '.';

export enum CourseAddCourseResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SELECTION_ID_NOT_EXISTS = 'SELECTION_ID_NOT_EXISTS',
}

export class CourseAddCourseResponseDto {
  @ApiProperty({ enum: CourseAddCourseResponseError })
  error?: CourseAddCourseResponseError;

  @ApiProperty({ type: CourseInfoDto })
  info?: CourseInfoDto;
}
