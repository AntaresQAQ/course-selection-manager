import { ApiProperty } from '@nestjs/swagger';

export enum StudentRemoveStudentsResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class StudentRemoveStudentsResponseDto {
  @ApiProperty({ enum: StudentRemoveStudentsResponseError })
  error?: StudentRemoveStudentsResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
