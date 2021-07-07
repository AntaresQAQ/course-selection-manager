import { ApiProperty } from '@nestjs/swagger';

export enum AddStudentsResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENTS_CONFLICT = 'STUDENTS_CONFLICT',
  ID_ALREADY_EXISTS = 'ID_ALREADY_EXISTS',
}

export class AddStudentsResponseDto {
  @ApiProperty()
  error?: AddStudentsResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
