import { ApiProperty } from '@nestjs/swagger';

export enum CourseRemoveCourseResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class CourseRemoveCourseResponseDto {
  @ApiProperty({ enum: CourseRemoveCourseResponseError })
  error?: CourseRemoveCourseResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
