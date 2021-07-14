import { ApiProperty } from '@nestjs/swagger';

export enum SelectionRemoveStudentsResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SELECTION_ID_NOT_EXISTS = 'SELECTION_ID_NOT_EXISTS',
}

export class SelectionRemoveStudentsResponseDto {
  @ApiProperty({ enum: SelectionRemoveStudentsResponseError })
  error?: SelectionRemoveStudentsResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
