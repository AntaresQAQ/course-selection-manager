import { ApiProperty } from '@nestjs/swagger';

export enum RemoveSelectionResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class RemoveSelectionResponseDto {
  @ApiProperty({ enum: RemoveSelectionResponseError })
  error?: RemoveSelectionResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
