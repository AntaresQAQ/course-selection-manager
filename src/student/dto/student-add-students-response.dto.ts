import { ApiProperty } from '@nestjs/swagger';

export enum StudentAddStudentsResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENTS_CONFLICT = 'STUDENTS_CONFLICT',
  ID_ALREADY_EXISTS = 'ID_ALREADY_EXISTS',
}

export class StudentAddStudentsResponseDto {
  @ApiProperty()
  error?: StudentAddStudentsResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
