import { ApiProperty } from '@nestjs/swagger';
import { SelectionInfoDto } from '.';

export enum SelectionGetListResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  STUDENT_ID_NOT_EXISTS = 'STUDENT_ID_NOT_EXISTS',
}

export class SelectionGetListResponseDto {
  @ApiProperty({ enum: SelectionGetListResponseError })
  error?: SelectionGetListResponseError;

  @ApiProperty({ isArray: true, type: SelectionInfoDto })
  selections?: SelectionInfoDto[];
}
