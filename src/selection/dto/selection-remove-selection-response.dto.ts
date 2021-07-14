import { ApiProperty } from '@nestjs/swagger';

export enum SelectionRemoveSelectionResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class SelectionRemoveSelectionResponseDto {
  @ApiProperty({ enum: SelectionRemoveSelectionResponseError })
  error?: SelectionRemoveSelectionResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
