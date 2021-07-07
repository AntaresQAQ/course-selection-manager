import { ApiProperty } from '@nestjs/swagger';

export enum StudentResetResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ERROR_STUDENT_ID = 'ERROR_STUDENT_ID',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class StudentResetResponseDto {
  @ApiProperty()
  error?: StudentResetResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
