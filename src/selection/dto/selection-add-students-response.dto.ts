import { ApiProperty } from '@nestjs/swagger';
import { SelectionInfoDto } from '.';

export enum SelectionAddStudentsResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SELECTION_ID_NOT_EXISTS = 'SELECTION_ID_NOT_EXISTS',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
}

export class SelectionAddStudentsResponseDto {
  @ApiProperty({ enum: SelectionAddStudentsResponseError })
  error?: SelectionAddStudentsResponseError;

  @ApiProperty()
  result?: 'SUCCEED';

  @ApiProperty({ type: SelectionInfoDto })
  selection?: SelectionInfoDto;
}
