import { ApiProperty } from '@nestjs/swagger';
import { SelectionInfoDto } from '.';

export enum SelectionGetInfoResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SELECTION_ID_NOT_EXISTS = 'SELECTION_ID_NOT_EXISTS',
}

export class SelectionGetInfoResponseDto {
  @ApiProperty({ enum: SelectionGetInfoResponseError })
  error?: SelectionGetInfoResponseError;

  @ApiProperty({ type: SelectionInfoDto })
  info?: SelectionInfoDto;
}
