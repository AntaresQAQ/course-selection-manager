import { ApiProperty } from '@nestjs/swagger';
import { SelectionInfoDto } from '.';

export enum SelectionAddSelectionResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
}

export class SelectionAddSelectionResponseDto {
  @ApiProperty({ enum: SelectionAddSelectionResponseError })
  error?: SelectionAddSelectionResponseError;

  @ApiProperty()
  result?: 'SUCCEED';

  @ApiProperty({ type: SelectionInfoDto })
  selection?: SelectionInfoDto;
}
